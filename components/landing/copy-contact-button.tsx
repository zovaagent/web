"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const CONTACT_ADDRESS = "2XkT8ScYvKnD7d2RT9Bx7zdobT9FnrHfBC4PcgVgpump";

export function CopyContactButton({ variant = "default" }: { variant?: "default" | "compact" }) {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(CONTACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === "compact") {
    return (
      <button
        onClick={copyAddress}
        className="flex items-center gap-2 text-white/35 hover:text-white/70 transition-colors text-sm cursor-pointer"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? "Copied!" : "Copy Contact Address"}
      </button>
    );
  }

  return (
    <button
      onClick={copyAddress}
      className="flex items-center gap-2 px-4 py-2 bg-white/[0.04] border border-white/10 hover:bg-white/10 hover:border-cyan-500/40 text-white/70 hover:text-white font-medium rounded-sm transition-all duration-300 cursor-pointer text-xs hover:-translate-y-0.5"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : "Copy Contact Address"}
    </button>
  );
}
