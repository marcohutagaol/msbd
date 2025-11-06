"use client"

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map
    const map = L.map(mapRef.current).setView([-6.2088, 106.8456], 15) // Jakarta coordinates

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    // Add marker for office location
    const officeMarker = L.marker([-6.2088, 106.8456]).addTo(map)
    officeMarker.bindPopup(`
      <div class="p-2">
        <strong>PT. Classik Creactive Office</strong><br/>
        <span class="text-sm">Jl. Sudirman No. 123, Jakarta Selatan</span>
      </div>
    `)

    // Add circle to show accuracy area
    L.circle([-6.2088, 106.8456], {
      color: 'blue',
      fillColor: '#1e40af',
      fillOpacity: 0.1,
      radius: 100
    }).addTo(map)

    mapInstanceRef.current = map

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          
          // Add user location marker
          const userMarker = L.marker([latitude, longitude]).addTo(map)
          userMarker.bindPopup(`
            <div class="p-2">
              <strong>Lokasi Anda Saat Ini</strong><br/>
              <span class="text-sm">Anda berada di sini</span>
            </div>
          `)

          // Add circle for user location accuracy
          L.circle([latitude, longitude], {
            color: 'red',
            fillColor: '#dc2626',
            fillOpacity: 0.1,
            radius: position.coords.accuracy
          }).addTo(map)

          // Fit map to show both markers
          const group = new L.FeatureGroup([officeMarker, userMarker])
          map.fitBounds(group.getBounds().pad(0.1))
        },
        (error) => {
          console.log('Error getting location:', error)
          // Show default view if location access is denied
          officeMarker.openPopup()
        }
      )
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg"
      style={{ minHeight: '300px' }}
    />
  )
}