"use client"

import { useLayout } from "@/context/LayoutContext"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function LayoutClientWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { showLayout } = useLayout()

  return (
    <>
      {showLayout && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {showLayout && <Footer />}
    </>
  )
}
