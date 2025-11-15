// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Lock, Mail } from "lucide-react"

// export default function LoginPage() {
//   const router = useRouter()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     alert(`Login functionality coming soon!`)
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-sky-50 to-white px-6">
//       <div className="bg-white rounded-2xl shadow-lg border border-sky-100 w-full max-w-md p-8">
//         <h2 className="text-3xl font-bold text-center text-sky-600">Welcome Back 💙</h2>
//         <p className="text-center text-gray-500 mt-2 mb-6">
//           Login to continue your journey with <span className="font-semibold text-sky-600">Aashaa</span>
//         </p>

//         <form onSubmit={handleLogin} className="space-y-5">
//           <div>
//             <label className="text-sm font-medium text-gray-700">Email</label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-3.5 w-5 h-5 text-sky-500" />
//               <Input
//                 type="email"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="pl-10 mt-1"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="text-sm font-medium text-gray-700">Password</label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3.5 w-5 h-5 text-sky-500" />
//               <Input
//                 type="password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="pl-10 mt-1"
//               />
//             </div>
//           </div>

//           <Button
//             type="submit"
//             className="w-full bg-linear-to-b from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-full mt-4"
//           >
//             Login
//           </Button>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-6">
//           Don't have an account?{" "}
//           <span
//             className="text-sky-600 font-semibold hover:underline cursor-pointer"
//             onClick={() => router.push("/signup")}
//           >
//             Sign up
//           </span>
//         </p>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, Mail } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Login functionality coming soon!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3E7D3] to-[#E8DCC4] flex items-center justify-center px-6 pb-10">
      <div className="bg-[#FCF8F4] rounded-2xl shadow-lg border border-[#D6C7B5] w-full max-w-md p-8">

        <h2 className="text-3xl font-bold text-center text-[#6B4F3A]">
          Welcome Back
        </h2>

        <p className="text-center text-[#8C7664] mt-2 mb-6">
          Login to continue your journey with{" "}
          <span className="font-semibold text-[#6B4F3A]">Aashaa</span>
        </p>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-[#6B4F3A]">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-[#A68B7C]" />
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 mt-1 bg-white border-[#D6C7B5] text-[#4B3A34] placeholder:text-[#A68B7C]"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[#6B4F3A]">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-[#A68B7C]" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 mt-1 bg-white border-[#D6C7B5] text-[#4B3A34] placeholder:text-[#A68B7C]"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#C9A96A] to-[#A48548] 
                       hover:from-[#A48548] hover:to-[#7D6636] 
                       text-white rounded-full mt-4 shadow-md"
          >
            Login
          </Button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-[#8C7664] mt-6">
          Don't have an account?{" "}
          <span
            className="text-[#6B4F3A] font-semibold hover:underline cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  )
}

