"use client"

import { createContext, useContext, useState } from "react"

type LayoutContextValue = {
  showLayout: boolean
  setShowLayout: (value: boolean) => void
}

const LayoutContext = createContext<LayoutContextValue>({
  showLayout: true,
  setShowLayout: () => {},
})

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [showLayout, setShowLayout] = useState(true)

  return (
    <LayoutContext.Provider value={{ showLayout, setShowLayout }}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  return useContext(LayoutContext)
}
