"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Settings, LogOut, Menu, X } from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
  onLogout: () => void
  activeTab?: "dashboard" | "opportunities"
  onTabChange?: (tab: "dashboard" | "opportunities") => void
}

export function AdminLayout({ children, onLogout, activeTab = "dashboard", onTabChange }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleTabChange = (tab: "dashboard" | "opportunities") => {
    onTabChange?.(tab)
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 sm:relative sm:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-lg text-foreground">Ample</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <button
              onClick={() => handleTabChange("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-foreground hover:bg-muted transition-colors ${
                activeTab === "dashboard" ? "bg-muted/50" : ""
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </button>
            <button
              onClick={() => handleTabChange("opportunities")}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-foreground hover:bg-muted transition-colors ${
                activeTab === "opportunities" ? "bg-muted/50" : ""
              }`}
            >
              <Settings className="w-5 h-5" />
              Gestionar Oportunidades
            </button>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <Button
              onClick={onLogout}
              variant="outline"
              className="w-full border-border text-foreground hover:bg-muted justify-start gap-3 bg-transparent"
            >
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Close button for mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="sm:hidden absolute top-4 right-4 text-foreground hover:bg-muted p-2 rounded"
        >
          <X className="w-5 h-5" />
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile menu button */}
        <div className="sm:hidden bg-card border-b border-border p-4 flex justify-between items-center">
          <h1 className="font-bold text-foreground">Ample Admin</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-foreground hover:bg-muted p-2 rounded">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-8">{children}</main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 sm:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
