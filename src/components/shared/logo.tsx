import React from "react";
import { Camera, BookOpen } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      {/* 3D Stacked Icons for Camera + Book */}
      <div className="flex -space-x-2 drop-shadow-lg relative">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 rounded-lg transform -rotate-12 z-10 shadow-xl border border-white/20 transition-transform hover:rotate-0">
          <Camera className="h-5 w-5 text-white" />
        </div>
        <div className="bg-gradient-to-br from-blue-400 to-cyan-500 p-1.5 rounded-lg transform rotate-6 shadow-xl border border-white/20 transition-transform hover:rotate-0">
          <BookOpen className="h-5 w-5 text-white" />
        </div>
      </div>
      <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center">
        News
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 drop-shadow-sm">
          InSec
        </span>
      </h1>
    </div>
  );
}
