"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock, User } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [agree, setAgree] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Signup functionality coming soon!`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-b from-[#F3E7D3] to-[#E8DCC4] px-6 pb-10">

      <div className="bg-[#FCF8F4] rounded-2xl shadow-xl 
        border border-[#D8C8B3] w-full max-w-md p-8">

        <h2 className="text-3xl font-bold text-center text-[#6B4F4F]">
          Create Your Aashaa Account ✨
        </h2>
        <p className="text-center text-[#8C7A68] mt-2 mb-6">
          Begin your emotional wellness journey with us
        </p>

        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-[#4B3A34]">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-[#A5865E]" />
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-11 mt-1 bg-[#FFF9F1] border-[#D8C8B3] 
                text-[#4B3A34] placeholder:text-[#A68B7C]"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-[#4B3A34]">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-[#A5865E]" />
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11 mt-1 bg-[#FFF9F1] border-[#D8C8B3] 
                text-[#4B3A34] placeholder:text-[#A68B7C]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-[#4B3A34]">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-[#A5865E]" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11 mt-1 bg-[#FFF9F1] border-[#D8C8B3] 
                text-[#4B3A34] placeholder:text-[#A68B7C]"
              />
            </div>
          </div>

          {/* Agree Terms */}
          <div className="flex items-center gap-2 text-sm text-[#6B4F4F]">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="w-4 h-4 text-[#A5865E] border-[#CBB08B] rounded"
            />
            <span>
              I agree to the{" "}
              <a href="#" className="text-[#8B6E4A] hover:underline font-medium">
                Terms & Conditions
              </a>
            </span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#CBB08B] to-[#A5865E] 
            hover:from-[#A5865E] hover:to-[#8B6E4A] 
            text-white rounded-full mt-4 shadow-lg"
          >
            Create Account
          </Button>
        </form>

        {/* Already have account */}
        <p className="text-center text-sm text-[#6B4F4F] mt-6">
          Already have an account?{" "}
          <span
            className="text-[#8B6E4A] font-semibold hover:underline cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  )
}
