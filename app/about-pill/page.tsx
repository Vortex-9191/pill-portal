import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Heart, ShieldCheck, Sparkles, AlertCircle } from "lucide-react"

export default function AboutPillPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="container text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-6">
              低用量ピルについて
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              避妊だけじゃない。女性のカラダとココロをサポートする<br className="hidden sm:inline" />
              低用量ピルの正しい知識とメリットをご紹介します。
            </p>
          </div>
        </section>

        {/* What is Pill */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-primary">低用量ピルとは？</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    低用量ピル（OC：Oral Contraceptives）は、女性ホルモン（卵胞ホルモンと黄体ホルモン）が含まれたお薬です。
                  </p>
                  <p>
                    毎日1回1錠を正しく服用することで、排卵を抑制し、高い避妊効果を発揮します。また、ホルモンバランスを整えることで、生理痛の緩和やPMS（月経前症候群）の改善、肌荒れの改善など、避妊以外にも多くの副効用（メリット）があります。
                  </p>
                  <p>
                    欧米では多くの女性がライフスタイルに合わせて活用しており、日本でも利用者が増えています。
                  </p>
                </div>
              </div>
              <div className="bg-secondary/30 rounded-3xl p-8 flex items-center justify-center min-h-[300px]">
                {/* Placeholder for illustration */}
                <div className="text-center">
                  <div className="bg-white p-6 rounded-full inline-block shadow-sm mb-4">
                    <Heart className="h-12 w-12 text-primary" />
                  </div>
                  <p className="font-bold text-foreground">女性ホルモンをコントロール</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container">
            <h2 className="text-2xl font-bold mb-12 text-center">低用量ピルの3つのメリット</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/10">
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-4">確実な避妊効果</h3>
                <p className="text-muted-foreground">
                  正しく服用すれば99.7%という高い避妊効果があります。パートナー任せにせず、主体的に避妊を選択できます。
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/10">
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-4">生理トラブルの改善</h3>
                <p className="text-muted-foreground">
                  生理痛が軽くなる、経血量が減る、生理周期が整うなど、毎月の生理にまつわる不調を改善します。
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/10">
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-4">肌荒れ・ニキビ改善</h3>
                <p className="text-muted-foreground">
                  ホルモンバランスの乱れによる肌荒れや大人ニキビの改善が期待できます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Side Effects */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-2xl font-bold mb-8 text-center">副作用について</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 mb-8">
              <div className="flex gap-4 items-start">
                <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div className="space-y-4">
                  <p className="font-bold text-yellow-800">飲み始めのマイナートラブル</p>
                  <p className="text-yellow-700">
                    服用開始から1〜2ヶ月は、吐き気、頭痛、不正出血、胸の張りなどの症状が出ることがありますが、体が慣れてくると自然に治まることがほとんどです。
                  </p>
                  <p className="font-bold text-yellow-800 mt-4">血栓症のリスク</p>
                  <p className="text-yellow-700">
                    ごく稀に血管の中で血が固まる「血栓症」のリスクがわずかに上がります。喫煙者や肥満の方、40歳以上の方はリスクが高まるため、医師と相談が必要です。
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center space-x-4">
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/about-pill/side-effects">
                  副作用について詳しく見る
                </Link>
              </Button>
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/about-pill/usage">
                  正しい飲み方を知る
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground text-center">
          <div className="container">
            <h2 className="text-3xl font-bold mb-6">まずは医師に相談してみませんか？</h2>
            <p className="text-lg mb-8 opacity-90">
              オンライン診療なら、自宅からスマホで気軽に相談できます。
            </p>
            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg rounded-full" asChild>
              <Link href="/search">
                クリニックを探す
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
