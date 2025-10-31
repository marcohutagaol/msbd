import React, { useState, useEffect, useRef } from "react"
import { MapPin, Clock, Calendar, Camera, CheckCircle } from "lucide-react"
import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import axios from "axios"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

const breadcrumbs = [{ title: "Absensi", href: "/absensi" }]

export default function CatatKehadiran() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [cameraActive, setCameraActive] = useState(false)
  const [photo, setPhoto] = useState<string | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [isClockInSuccess, setIsClockInSuccess] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })

  const formatDate = (date: Date) =>
    date.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })

  const handleCameraToggle = async () => {
    if (!cameraActive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
        setCameraActive(true)
      } catch (error) {
        alert("Gagal mengakses kamera: " + (error as Error).message)
      }
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
      if (videoRef.current) videoRef.current.srcObject = null
      setCameraActive(false)
    }
  }

  const handleTakePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

    canvas.toBlob((blob) => {
      if (!blob) return
      const file = new File([blob], `absensi_${Date.now()}.png`, { type: "image/png" })
      setPhotoFile(file)
      const url = URL.createObjectURL(blob)
      setPhoto(url)
    }, "image/png")
  }

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const map = L.map(mapRef.current).setView([-6.2088, 106.8456], 15)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    const officeMarker = L.marker([-6.2088, 106.8456]).addTo(map)
    officeMarker.bindPopup("<strong>PT. Classik Creactive Office</strong>")

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude, accuracy } = pos.coords
          const userMarker = L.marker([latitude, longitude]).addTo(map)
          userMarker.bindPopup("<strong>Lokasi Anda Saat Ini</strong>")
          L.circle([latitude, longitude], {
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.1,
            radius: accuracy,
          }).addTo(map)

          const group = new L.FeatureGroup([officeMarker, userMarker])
          map.fitBounds(group.getBounds().pad(0.1))
        },
        (err) => {
          console.error("Gagal mengambil lokasi:", err)
          officeMarker.openPopup()
        }
      )
    }

    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  const handleClockIn = async () => {
    if (!photoFile) {
      alert("Harap ambil foto terlebih dahulu!")
      return
    }

    const now = new Date()
    const waktuAbsen = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(
      2,
      "0"
    )}:${String(now.getSeconds()).padStart(2, "0")}`

    let lokasi = "Tidak diketahui"
    if (navigator.geolocation) {
      await new Promise<void>((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            lokasi = `${pos.coords.latitude}, ${pos.coords.longitude}`
            resolve()
          },
          () => resolve()
        )
      })
    }

    const deviceInfo = `${navigator.platform} - ${navigator.userAgent}`

    let ipAddress = "0.0.0.0"
    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json")
      const ipData = await ipResponse.json()
      ipAddress = ipData.ip
    } catch (error) {
      console.error("Gagal mendapatkan IP:", error)
    }

    const formData = new FormData()
    formData.append("foto", photoFile)
    formData.append("tipe_absen", "masuk")
    formData.append("waktu_absen", waktuAbsen)
    formData.append("lokasi", lokasi)
    formData.append("device_info", deviceInfo)
    formData.append("ip_address", ipAddress)

    try {
      console.log("Cek data sebelum kirim:", {
  photoFile,
  lokasi,
  ipAddress,
})

      const response = await axios.post("http://127.0.0.1:8000/absensi/store", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      console.log("Cloudinary URL:", response.data.url)
      setIsClockInSuccess(true)
      

      setTimeout(() => {
        setPhoto(null)
        setPhotoFile(null)
        setCameraActive(false)
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop())
          streamRef.current = null
        }
      }, 3000)
    } catch (err: any) {
  if (err.response) {
    console.error("Response error:", err.response.data)
    alert("Gagal menyimpan absensi!\n" + JSON.stringify(err.response.data))
  } else {
    console.error("Error:", err)
    alert("Gagal menyimpan absensi!\n" + err.message)
  }
}
  }

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Catat Kehadiran" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="flex-1 overflow-auto p-8 bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto space-y-6">
            {isClockInSuccess && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Berhasil Clock In!</h2>
                    <p className="text-green-50 mt-1">Absensi Anda telah tercatat pada sistem</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Waktu Clock In</p>
                    <p className="text-2xl font-bold text-gray-900 font-mono">{formatTime(currentTime)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tanggal</p>
                    <p className="text-lg font-semibold text-gray-900">{formatDate(currentTime)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white flex items-center gap-3">
                  <Camera className="w-5 h-5" />
                  <h3 className="font-semibold">Foto Absensi</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="rounded-lg overflow-hidden bg-gray-900 aspect-[4/3] flex items-center justify-center">
                    {photo ? (
                      <img src={photo} alt="Hasil Foto" className="object-cover w-full h-full" />
                    ) : (
                      <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
                    )}
                    <canvas ref={canvasRef} className="hidden" />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleCameraToggle}
                      className={`flex-1 py-3 rounded-lg font-semibold ${
                        cameraActive
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {cameraActive ? "Matikan Kamera" : "Aktifkan Kamera"}
                    </button>
                    {cameraActive && (
                      <button
                        onClick={handleTakePhoto}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
                      >
                        Ambil Foto
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 text-white flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <h3 className="font-semibold">Lokasi Absensi</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div ref={mapRef} className="w-full rounded-lg overflow-hidden" style={{ height: "390px" }} />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleClockIn}
                className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Konfirmasi Kehadiran
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
