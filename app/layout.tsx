import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_JP, Zen_Maru_Gothic } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { MobileNav } from "@/components/mobile-nav"

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
})

const zenMaruGothic = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zen-maru-gothic",
})

export const metadata: Metadata = {
  title: "低用量ピル.com | オンライン処方・クリニック検索",
  description: "低用量ピル.com」。生理痛、避妊、肌荒れなどのお悩みを解決。全国のクリニック情報や口コミも掲載。",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`font-sans ${notoSansJP.variable} ${zenMaruGothic.variable} antialiased font-['Zen_Maru_Gothic',_sans-serif]`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <MobileNav />
        {/* Analytics component removed */}
      </body>
    </html>
  )
}
