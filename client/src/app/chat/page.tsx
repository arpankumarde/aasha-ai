"use client"

import { useState, useEffect } from "react"
import { useLayout } from "@/context/LayoutContext"
import ChatSidebar from "@/components/ChatSidebar"
import ChatWindow from "@/components/ChatWindow"
import MentorsPage from "@/components/MentorsPage"

export default function ChatPage() {
  const { setShowLayout } = useLayout()

  useEffect(() => {
    setShowLayout(false)
    return () => setShowLayout(true)
  }, [setShowLayout])

  const [reminders, setReminders] = useState<string[]>([])
  const [activePage, setActivePage] = useState<"chat" | "mentors" | "book">("chat")

  const handleDetectReminder = (msg: string) => {
    if (msg.toLowerCase().includes("remind") || msg.toLowerCase().includes("tomorrow")) {
      setReminders((prev) => [...prev, msg])
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-sky-50 to-white">

      {/* LEFT SIDEBAR */}
      <ChatSidebar
        reminders={reminders}
        onSelect={(page) => setActivePage(page)}
      />

      {/* RIGHT SIDE CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* RIGHT PANEL SCROLLABLE AREA */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-sky-300 scrollbar-track-transparent">

          {activePage === "chat" && (
            <ChatWindow onDetectReminder={handleDetectReminder} />
          )}

          {activePage === "mentors" && (
            <div className="p-4">
              <MentorsPage />
            </div>
          )}

          {activePage === "book" && (
            <div className="p-4">
              <div className="text-xl font-semibold">Booking Page Coming Soon…</div>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}
