import React from "react"
import { Settings as SettingsIcon, Sparkles } from "lucide-react"

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center space-y-6 max-w-2xl px-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#B08F7A] to-[#6B4F4F] flex items-center justify-center shadow-lg animate-pulse">
              <SettingsIcon className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#FCF8F4] flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-[#8C6D5A]" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-[#8C6D5A] to-[#6B4F4F] bg-clip-text text-transparent">
          Settings & Preferences
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-[#6B4F4F] font-medium">
          Coming Soon
        </p>

        {/* Description */}
        <p className="text-[#A68B7C] max-w-md mx-auto">
          Customize your Aashaa experience to match your needs. Profile settings, notifications, privacy controls, and personalization options will be available here shortly.
        </p>

        {/* Decorative Elements */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <div className="w-2 h-2 rounded-full bg-[#8C6D5A] animate-bounce"></div>
          <div className="w-2 h-2 rounded-full bg-[#B08F7A] animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 rounded-full bg-[#C7A896] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}

export default Page
