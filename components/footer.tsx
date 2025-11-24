import Link from 'next/link'
import { Heart, ChevronRight } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-24 md:pb-8 text-sm text-slate-500">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-xl mb-6">
            <div className="bg-rose-500 p-1.5 rounded-lg text-white">
              <Heart size={20} fill="currentColor" />
            </div>
            ピルミライ
          </div>
          <p className="text-xs leading-relaxed mb-6">
            ピルミライは、女性の健康課題を解決するための総合情報ポータルサイトです。<br />
            信頼できる医療機関の情報と、正しい知識の発信に努めています。
          </p>
        </div>

        <div>
          <h4 className="text-slate-800 font-bold mb-6 text-base">コンテンツ</h4>
          <ul className="space-y-3">
            <li><Link href="/about-pill" className="hover:text-rose-500 transition flex items-center gap-2"><ChevronRight size={12} /> ピル基礎知識・効果</Link></li>
            <li><Link href="/search" className="hover:text-rose-500 transition flex items-center gap-2"><ChevronRight size={12} /> オンライン診療ランキング</Link></li>
            <li><Link href="/about-pill/usage" className="hover:text-rose-500 transition flex items-center gap-2"><ChevronRight size={12} /> ピルの種類一覧</Link></li>
            <li><Link href="/search" className="hover:text-rose-500 transition flex items-center gap-2"><ChevronRight size={12} /> ユーザー体験談</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-800 font-bold mb-6 text-base">エリア検索</h4>
          <ul className="space-y-3">
            <li><Link href="/areas/tokyo" className="hover:text-rose-500 transition flex items-center gap-2"><ChevronRight size={12} /> 東京の婦人科</Link></li>
            <li><Link href="/areas/osaka" className="hover:text-rose-500 transition flex items-center gap-2"><ChevronRight size={12} /> 大阪の婦人科</Link></li>
            <li><Link href="/areas/aichi" className="hover:text-rose-500 transition flex items-center gap-2"><ChevronRight size={12} /> 名古屋の婦人科</Link></li>
            <li><Link href="/search" className="hover:text-rose-500 transition flex items-center gap-2"><ChevronRight size={12} /> 全国のオンライン診療</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-800 font-bold mb-6 text-base">サイト情報</h4>
          <ul className="space-y-3">
            <li><Link href="/company" className="hover:text-rose-500 transition flex items-center gap-2"><ChevronRight size={12} /> 運営会社</Link></li>
            <li><Link href="/privacy" className="hover:text-rose-500 transition flex items-center gap-2"><ChevronRight size={12} /> プライバシーポリシー</Link></li>
            <li><Link href="/guidelines" className="hover:text-rose-500 transition flex items-center gap-2"><ChevronRight size={12} /> 医療広告ガイドライン</Link></li>
            <li><Link href="/contact" className="hover:text-rose-500 transition flex items-center gap-2"><ChevronRight size={12} /> お問い合わせ</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 border-t border-slate-100 pt-8 text-center text-xs text-slate-400">
        &copy; 2025 Pill Mirai. All Rights Reserved.
      </div>
    </footer>
  )
}
