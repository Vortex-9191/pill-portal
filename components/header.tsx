'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, Menu, X, Smartphone } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer" onClick={scrollToTop}>
            <div className="bg-rose-500 text-white p-1.5 rounded-xl shadow-md shadow-rose-200 group-hover:scale-105 transition-transform duration-300">
              <Heart size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">ピルミライ</span>
          </Link>

          <nav className="hidden md:flex space-x-8 text-sm font-bold text-slate-500">
            <Link href="/about-pill" className="hover:text-rose-500 transition py-2 border-b-2 border-transparent hover:border-rose-500">
              ピルの基礎知識
            </Link>
            <Link href="/search" className="hover:text-rose-500 transition py-2 border-b-2 border-transparent hover:border-rose-500">
              クリニック検索
            </Link>
            <Link href="/about-pill/usage" className="hover:text-rose-500 transition py-2 border-b-2 border-transparent hover:border-rose-500">
              種類・料金
            </Link>
            <Link href="/faq" className="hover:text-rose-500 transition py-2 border-b-2 border-transparent hover:border-rose-500">
              Q&A
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/search" className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-slate-200 transition transform hover:-translate-y-0.5 flex items-center gap-2">
              <Smartphone size={16} />
              オンライン診療予約
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-slate-600 hover:bg-rose-50 rounded-lg transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <div className={`md:hidden absolute w-full bg-white border-t border-slate-100 shadow-xl z-50 transition-all duration-300 ease-in-out origin-top ${isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0 overflow-hidden'}`}>
        <div className="p-4 space-y-2">
          <Link href="/about-pill" className="block px-4 py-3 rounded-lg hover:bg-rose-50 text-slate-700 font-bold" onClick={() => setIsMenuOpen(false)}>
            ピルの基礎知識
          </Link>
          <Link href="/search" className="block px-4 py-3 rounded-lg hover:bg-rose-50 text-slate-700 font-bold" onClick={() => setIsMenuOpen(false)}>
            クリニック検索
          </Link>
          <Link href="/about-pill/usage" className="block px-4 py-3 rounded-lg hover:bg-rose-50 text-slate-700 font-bold" onClick={() => setIsMenuOpen(false)}>
            種類・料金
          </Link>
          <div className="pt-4 border-t border-slate-100 mt-2">
            <Link href="/search" className="block w-full bg-rose-500 text-white py-3 rounded-xl font-bold shadow-md text-center" onClick={() => setIsMenuOpen(false)}>
              オンライン診療予約
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
