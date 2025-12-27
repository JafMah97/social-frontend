"use client";
import { Globe } from "lucide-react";

export default function PostPrivacyIndicator({ label }:{label:string}) {
  return (
    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/15 transition-colors">
      <Globe className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}
