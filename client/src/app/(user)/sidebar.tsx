"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Settings,
  MessageSquareHeart,
  HeartHandshake,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-[#D9C8BA] bg-[#FCF8F4]">
      <SidebarHeader className="border-b border-[#D9C8BA] bg-gradient-to-r from-[#C7A896] to-[#B08F7A] p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 shadow-sm">
            <MessageSquareHeart className="w-5 h-5 text-white" />
            <HeartHandshake className="w-4 h-4 absolute -bottom-1 -right-1 text-white/90" />
          </div>
          <span className="text-xl font-bold text-white tracking-wide">
            Aashaa
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-[#FCF8F4]">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#6B4F4F] font-semibold px-4 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="hover:bg-[#F1E6DD] data-[active=true]:bg-[#E6D4C3] data-[active=true]:text-[#6B4F4F] text-[#8B5E34]"
                  >
                    <Link href={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-[#D9C8BA] bg-brown-50 p-4">
        <div className="text-xs text-[#8B5E34] text-center">
          <p className="font-medium">Aashaa Mental Wellness</p>
          <p className="text-[#A68B7C] mt-1">© 2024 All rights reserved</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-brown-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 border-b border-[#D9C8BA] bg-[#FCF8F4]/80 backdrop-blur px-5 py-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-[#6B4F4F] hover:bg-[#F1E6DD]" />
              <h1 className="text-lg font-semibold text-[#4B3A34]">
                Welcome to Aashaa
              </h1>
            </div>
          </header>
          <div className="flex-1 p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}