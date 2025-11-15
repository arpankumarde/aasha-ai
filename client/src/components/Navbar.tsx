'use client'
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, HeartHandshake, MessageSquareHeart } from "lucide-react"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push(`/#${id}`)
    }
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[#EADCC3] shadow-md border-b border-[#C8B99E]">
      <div className="container mx-auto px-6 py-6 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-2 group cursor-pointer select-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl 
            bg-gradient-to-b from-[#CBB58C] to-[#B49A6C] text-white shadow-md group-hover:scale-110 transition-transform">
            <MessageSquareHeart className="w-5 h-5 absolute opacity-80" />
            <HeartHandshake className="w-4 h-4 absolute -bottom-1 -right-1 opacity-70" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-b from-[#5C4A28] to-[#3E3120] bg-clip-text text-transparent tracking-wide">
            aashaa
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-[#4B3A34] font-medium">
          <button onClick={() => scrollToSection("home")} className="hover:text-[#7A5F45] transition-colors">Home</button>
          <button onClick={() => scrollToSection("about")} className="hover:text-[#7A5F45] transition-colors">About</button>
          <button onClick={() => scrollToSection("pricing")} className="hover:text-[#7A5F45] transition-colors">Pricing</button>
          <Link href="/home" className="hover:text-[#7A5F45] transition-colors">Chat</Link>
        </div>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button
              variant="outline"
              className="border-[#C8B99E] text-[#4B3A34] hover:bg-[#F0E2C9] rounded-full"
            >
              Login
            </Button>
          </Link>

          <Link href="/signup">
            <Button className="bg-gradient-to-r from-[#A88C63] to-[#8A6F47] hover:from-[#8A6F47] hover:to-[#6C5537] text-white rounded-full shadow">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-[#4B3A34] hover:text-[#7A5F45] transition"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-[#F3E7D3] border-t border-[#C8B99E] shadow-inner py-5 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col items-center gap-4 text-[#4B3A34]">
            <button onClick={() => {scrollToSection("home"); setMobileOpen(false)}}>Home</button>
            <button onClick={() => {scrollToSection("about"); setMobileOpen(false)}}>About</button>
            <button onClick={() => {scrollToSection("pricing"); setMobileOpen(false)}}>Pricing</button>
            <Link href="/mentors" onClick={() => setMobileOpen(false)}>Mentors</Link>
            <Link href="/chat" onClick={() => setMobileOpen(false)}>Chat</Link>

            <Link href="/login">
              <Button variant="outline" className="border-[#C8B99E] text-[#4B3A34]">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-b from-[#A88C63] to-[#8A6F47] text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}


