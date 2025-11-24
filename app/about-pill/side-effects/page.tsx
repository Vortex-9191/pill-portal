import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertTriangle, CheckCircle2, HelpCircle, ArrowRight } from "lucide-react"

export default function SideEffectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-yellow-50/50 py-16 md:py-24">
          <div className="container text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-6">
              低用量ピルの副作用について
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              「太る？」「吐き気がする？」<br />
              ピルの副作用に関する正しい知識と、対処法を解説します。
            </p>
          </div>
        </section>

        {/* Major Side Effects */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-2xl font-bold mb-12 text-center">主な副作用と対処法</h2>

            <div className="space-y-8">
              {/* Nausea */}
              <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-yellow-100 text-yellow-700 rounded-xl">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">吐き気・ムカムカ</h3>
                    <p className="text-muted-foreground mb-4">
                      飲み始めの1〜2週間によく見られる症状です。ホルモンバランスの変化に体が慣れようとしている反応です。
                    </p>
                    <div className="bg-secondary/30 p-4 rounded-lg">
                      <p className="font-bold text-sm mb-1">対処法</p>
                      <p className="text-sm text-muted-foreground">
                        就寝前に服用すると、寝ている間に症状のピークが過ぎるため楽になります。市販の吐き気止めを併用しても問題ありません。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bleeding */}
              <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-100 text-red-700 rounded-xl">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">不正出血</h3>
                    <p className="text-muted-foreground mb-4">
                      生理以外のタイミングで出血することがあります。飲み始めの1〜3シート目によく見られますが、飲み続けることで治まります。
                    </p>
                    <div className="bg-secondary/30 p-4 rounded-lg">
                      <p className="font-bold text-sm mb-1">対処法</p>
                      <p className="text-sm text-muted-foreground">
                        自己判断で服用を止めず、飲み続けてください。出血量が生理より多い場合や、腹痛を伴う場合は医師に相談してください。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Headache */}
              <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">頭痛</h3>
                    <p className="text-muted-foreground mb-4">
                      ホルモンの変動により頭痛が起きることがあります。
                    </p>
                    <div className="bg-secondary/30 p-4 rounded-lg">
                      <p className="font-bold text-sm mb-1">対処法</p>
                      <p className="text-sm text-muted-foreground">
                        市販の鎮痛剤を服用して様子を見てください。激しい頭痛や、手足のしびれを伴う場合は服用を中止し、直ちに受診してください。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Thrombosis Risk */}
        <section className="py-16 bg-red-50/50">
          <div className="container max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-4 text-red-900">注意すべき「血栓症」のリスク</h2>
              <p className="text-red-700">
                ごく稀ですが、血管内で血液が固まる「血栓症」のリスクがわずかに上昇します。<br />
                以下の症状がある場合は、直ちに服用を中止し、救急医療機関を受診してください。
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl border border-red-100 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-red-500" />
                <span className="font-medium">激しい足の痛み・むくみ</span>
              </div>
              <div className="bg-white p-6 rounded-xl border border-red-100 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-red-500" />
                <span className="font-medium">突然の激しい胸の痛み・息切れ</span>
              </div>
              <div className="bg-white p-6 rounded-xl border border-red-100 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-red-500" />
                <span className="font-medium">激しい頭痛・めまい</span>
              </div>
              <div className="bg-white p-6 rounded-xl border border-red-100 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-red-500" />
                <span className="font-medium">急激な視力低下・視野異常</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="text-2xl font-bold mb-8 text-center">副作用に関するQ&A</h2>
            <div className="space-y-6">
              <div className="bg-secondary/20 p-6 rounded-2xl">
                <h3 className="font-bold mb-2">Q. ピルを飲むと太りますか？</h3>
                <p className="text-muted-foreground">
                  A. ピル自体に太る作用はありません。ただし、ホルモンの影響で一時的に食欲が増したり、むくみやすくなることで体重が増えたと感じることがあります。
                </p>
              </div>
              <div className="bg-secondary/20 p-6 rounded-2xl">
                <h3 className="font-bold mb-2">Q. 将来妊娠しにくくなりませんか？</h3>
                <p className="text-muted-foreground">
                  A. そのようなことはありません。ピルの服用を中止すれば、通常1〜3ヶ月で排卵が再開し、妊娠可能な状態に戻ります。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground text-center">
          <div className="container">
            <h2 className="text-3xl font-bold mb-6">不安なことは医師に相談を</h2>
            <p className="text-lg mb-8 opacity-90">
              オンライン診療なら、副作用の不安も事前にしっかり相談できます。
            </p>
            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg rounded-full" asChild>
              <Link href="/search">
                クリニックを探す <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
