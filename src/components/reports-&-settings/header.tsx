"use client";

import { Bell } from "lucide-react";


export function Header() {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-foreground tracking-tight">Reports & Settings</h1>
      <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
        <Bell className="h-6 w-6 text-muted-foreground" />
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-background" />
      </div>
    </div>
  );
}

