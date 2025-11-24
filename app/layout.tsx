import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// ... imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`font-sans ${notoSansJP.variable} ${zenMaruGothic.variable} antialiased font-['Zen_Maru_Gothic',_sans-serif]`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          {children}
          <Footer />
        </Suspense>
        <MobileNav />
        {/* Analytics component removed */}
      </body>
    </html>
  )
}
