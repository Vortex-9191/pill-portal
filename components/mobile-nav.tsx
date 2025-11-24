'use client'

import Link from 'next/link'
import { Home, Search, MessageCircle } from 'lucide-react'

export function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 px-6 py-2 pb-safe">
      <div className="flex justify-between items-center max-w-sm mx-auto">
        <Link href="/" className="flex flex-col items-center gap-1 text-rose-500">
          <Home size={24} strokeWidth={2.5} />
          <span className="text-[10px] font-bold">ホーム</span>
        </Link>
        <Link href="/search" className="flex flex-col items-center gap-1 text-slate-400 hover:text-rose-500 transition">
          <Search size={24} />
          <span className="text-[10px] font-bold">検索</span>
        </Link>
        <Link href="/faq" className="flex flex-col items-center gap-1 text-slate-400 hover:text-rose-500 transition">
          <MessageCircle size={24} />
          <span className="text-[10px] font-bold">相談</span>
        </Link>
      </div>
    </div>
  )
}
