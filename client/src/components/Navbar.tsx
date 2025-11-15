'use client'
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, HeartHandshake, MessageSquareHeart } from "lucide-react"

export default function Navbar() {
  const [user, setUser] = useState<{ name: string; id: string } | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
  let mounted = true

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/check")
      if (!res.ok) throw new Error("Failed to fetch user status")
      const data = await res.json().catch(() => ({}))
      if (!mounted) return
      if (data.loggedIn && data.user) {
        setUser({ name: data.user.name, id: String(data.user.id) })
      } else {
        setUser(null)
      }
    } catch (err) {
      console.error("User check failed", err)
      if (mounted) setUser(null)
    }
  }

  fetchUser()

  const onUserChanged = () => {
    fetchUser()
  }

  window.addEventListener("userChanged", onUserChanged)

  return () => {
    mounted = false
    window.removeEventListener("userChanged", onUserChanged)
  }
}, [])



  const logout = async () => {
  await fetch("/api/auth/logout", { method: "POST" })

  // notify navbar and other components
  window.dispatchEvent(new Event("userChanged"))

  // local UI update and navigation
  setUser(null)
  router.push("/")
}


  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push(`/#${id}`) // fallback if not on homepage
    }
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-gradient-to-b from-[#F7EFE7] via-[#FCF8F4] to-[#F7EFE7] shadow-md border-b border-[#D9C8BA]">
  <div className="container mx-auto px-6 py-4 flex items-center justify-between">

    {/* Logo */}
    <div
      onClick={() => router.push("/")}
      className="flex items-center gap-2 group cursor-pointer select-none"
    >
      <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-b from-[#C7A896] to-[#A68B7C] text-white shadow-md group-hover:scale-110 transition-transform">
        <MessageSquareHeart className="w-5 h-5 absolute opacity-80" />
        <HeartHandshake className="w-4 h-4 absolute -bottom-1 -right-1 opacity-70" />
      </div>
      <span className="text-2xl font-bold bg-gradient-to-b from-[#6B4F4F] to-[#4B3A34] bg-clip-text text-transparent tracking-wide">
        aashaa
      </span>
    </div>

    {/* Desktop Nav */}
    <div className="hidden md:flex items-center gap-6 text-[#4B3A34] font-medium">
      <button onClick={() => scrollToSection("home")} className="hover:text-[#6B4F4F] transition-colors">Home</button>
      <button onClick={() => scrollToSection("about")} className="hover:text-[#6B4F4F] transition-colors">About</button>
      <button onClick={() => scrollToSection("pricing")} className="hover:text-[#6B4F4F] transition-colors">Pricing</button>
      <Link href="/mentors" className="hover:text-[#6B4F4F] transition-colors">Mentors</Link>
      <Link href="/chat" className="hover:text-[#6B4F4F] transition-colors">Chat</Link>
    </div>

    {/* Auth Section */}
    <div className="hidden md:flex items-center gap-4">
      {user ? (
        <div className="flex items-center gap-4">

          {/* Profile */}
          <div
            onClick={() => router.push("/profile")}
            className="relative w-10 h-10 rounded-full cursor-pointer bg-gradient-to-br from-[#B08F7A] to-[#8C6D5A] flex items-center justify-center text-white font-semibold text-lg shadow-md hover:scale-105 transition-transform"
          >
            {user.name.charAt(0).toUpperCase()}
            <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-white"></span>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="group relative overflow-hidden px-4 py-2 rounded-full bg-white border border-[#C7A896] text-[#6B4F4F] font-medium shadow-sm hover:text-white transition-all"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#8C6D5A] to-[#6B4F4F] opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative z-10">Logout</span>
          </button>
        </div>
      ) : (
        <>
          <Link href="/login">
            <Button
              variant="outline"
              className="border-[#C7A896] text-[#6B4F4F] hover:bg-[#F1E6DD] rounded-full"
            >
              Login
            </Button>
          </Link>

          <Link href="/signup">
            <Button className="bg-gradient-to-r from-[#8C6D5A] to-[#6B4F4F] hover:from-[#6B4F4F] hover:to-[#4B3A34] text-white rounded-full shadow">
              Sign Up
            </Button>
          </Link>
        </>
      )}
    </div>

    {/* Mobile Menu Toggle */}
    <button
      className="md:hidden text-[#4B3A34] hover:text-[#6B4F4F] transition"
      onClick={() => setMobileOpen(!mobileOpen)}
    >
      <Menu className="w-6 h-6" />
    </button>
  </div>

  {/* Mobile Dropdown */}
  {mobileOpen && (
    <div className="md:hidden bg-[#FCF8F4] border-t border-[#D9C8BA] shadow-inner py-5 animate-in slide-in-from-top duration-200">
      <div className="flex flex-col items-center gap-4 text-[#4B3A34]">

        <button onClick={() => {scrollToSection("home"); setMobileOpen(false)}}>Home</button>
        <button onClick={() => {scrollToSection("about"); setMobileOpen(false)}}>About</button>
        <button onClick={() => {scrollToSection("pricing"); setMobileOpen(false)}}>Pricing</button>
        <Link href="/mentors" onClick={() => setMobileOpen(false)}>Mentors</Link>
        <Link href="/chat" onClick={() => setMobileOpen(false)}>Chat</Link>

        {user ? (
          <Button variant="destructive" onClick={logout}>Logout</Button>
        ) : (
          <>
            <Link href="/login">
              <Button variant="outline" className="border-[#C7A896] text-[#6B4F4F]">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-linear-to-b from-[#8C6D5A] to-[#6B4F4F] text-white">
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )}
</nav>

  )
}

