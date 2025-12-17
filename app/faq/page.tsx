import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Simple FAQ data
const faqs = [
  {
    question: "保険証は必要ですか？",
    answer: "自由診療（避妊目的など）の場合は保険証は不要です。月経困難症などの治療目的で保険適用となる場合は必要になります。"
  },
  {
    question: "未成年でも受診できますか？",
    answer: "クリニックによって異なりますが、保護者の同意書があれば受診可能な場合が多いです。詳細は各クリニックのページをご確認ください。"
  },
  {
    question: "オンライン診療はどのように受けられますか？",
    answer: "予約した時間にスマートフォンやパソコンからビデオ通話で診療を受けられます。医師が最適なピルを提案します。"
  },
  {
    question: "副作用が心配です。どうすればいいですか？",
    answer: "服用開始後の軽い症状は数週間で落ち着きますが、強い症状や長期間続く場合は医師に相談してください。"
  }
]

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-6">
              よくある質問
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              低用量ピルやオンライン診療に関する疑問をまとめました。
            </p>
          </div>
        </section>
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                  <h3 className="font-bold mb-2 flex items-start gap-2">
                    <span className="text-primary">Q.</span>{" "}{faq.question}
                  </h3>
                  <p className="text-muted-foreground pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-primary text-primary-foreground text-center">
          <div className="container">
            <h2 className="text-3xl font-bold mb-6">さっそくクリニックを探す</h2>
            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg rounded-full" asChild>
              <Link href="/search">検索ページへ</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
