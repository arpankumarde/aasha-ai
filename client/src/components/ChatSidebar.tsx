"use client";

import { useState } from "react";
import {
  Users,
  Settings,
  MessageCircleHeart,
  HeartHandshake,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export default function ChatSidebar({
  onSelect,
}: {
  reminders: string[];
  onSelect: (page: "friends" | "settings") => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`relative flex flex-col border-r border-[#E6D4C3] bg-[#FBF7F2] shadow-sm transition-all duration-300 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-4 top-6 z-20 bg-[#FBF7F2] border border-[#E6D4C3] shadow-md rounded-full p-1 hover:bg-[#F1E4D6] transition"
      >
        {collapsed ? (
          <PanelLeftOpen className="w-5 h-5 text-[#8B5E34]" />
        ) : (
          <PanelLeftClose className="w-5 h-5 text-[#8B5E34]" />
        )}
      </button>

      {/* HEADER */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E6D4C3] bg-linear-to-r from-[#D7B38C] to-[#C79968] text-white">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/20">
          <MessageCircleHeart className="w-6 h-6" />
          <HeartHandshake className="w-4 h-4 absolute -bottom-1 -right-1 opacity-90" />
        </div>

        {!collapsed && (
          <h2 className="text-xl font-semibold tracking-wide">Aashaa</h2>
        )}
      </div>

      {/* COLLAPSED View */}
      {collapsed && (
        <div className="flex flex-col items-center mt-6 gap-6 text-[#8B5E34]">
          <CollapseIcon
            icon={<Users className="w-7 h-7" />}
            onClick={() => onSelect("friends")}
          />
          <CollapseIcon
            icon={<Settings className="w-7 h-7" />}
            onClick={() => onSelect("settings")}
          />
        </div>
      )}

      {/* EXPANDED View */}
      {!collapsed && (
        <div className="flex-1 px-5 py-4 space-y-4 overflow-y-auto">
          <SidebarItem
            icon={<Users className="w-6 h-6 text-[#8B5E34]" />}
            label="Friends"
            onClick={() => onSelect("friends")}
          />

          <SidebarItem
            icon={<Settings className="w-6 h-6 text-[#8B5E34]" />}
            label="Settings"
            onClick={() => onSelect("settings")}
          />
        </div>
      )}
    </div>
  );
}

/* ----------- Sub Components ----------- */

function SidebarItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#F1E4D6] transition group"
    >
      <div className="text-[#8B5E34] group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-[#6B4F4F] text-base group-hover:text-[#A7744B]">
        {label}
      </span>
    </button>
  );
}

function CollapseIcon({
  icon,
  onClick,
}: {
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-[#F6EDE3] to-[#FBF7F2] border border-[#E6D4C3] shadow-sm hover:shadow-md hover:bg-[#F1E4D6] transition-all duration-200"
    >
      {icon}
    </button>
  );
}


