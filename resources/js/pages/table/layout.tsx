import type React from "react"
import { Poppins } from "next/font/google"
import "./table.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
