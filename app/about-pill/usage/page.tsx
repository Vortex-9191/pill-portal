import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, Calendar, AlertCircle, ArrowRight, Check, CheckCircle2 } from "lucide-react"

export default function UsagePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-blue-50/50 py-16 md:py-24">
          <div className="container text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-6">
              低用量ピルの飲み方
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ピルの効果を最大限に発揮するためには、正しく服用することが大切です。<br />
              基本的な飲み方と、飲み忘れた時の対処法を解説します。
            </p>
          </div>
        </section>

        {/* Basic Usage */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-2xl font-bold mb-12 text-center">基本的な飲み方</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-border shadow-sm text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold mb-4">毎日同じ時間に飲む</h3>
                <p className="text-muted-foreground text-sm">
                  血中のホルモン濃度を一定に保つため、毎日決まった時間に1錠服用します。スマホのアラーム設定がおすすめです。
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-border shadow-sm text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold mb-4">生理初日から開始</h3>
                <p className="text-muted-foreground text-sm">
                  原則として生理が始まった日から飲み始めます。これにより、飲み始めたその日から避妊効果が得られます。
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-border shadow-sm text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold mb-4">シートの順番通りに</h3>
                <p className="text-muted-foreground text-sm">
                  シートに記載されている曜日や矢印に従って、1日1錠ずつ順番に服用してください。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 21 vs 28 */}
        <section className="py-16 bg-secondary/30">
          <div className="container max-w-4xl">
            <h2 className="text-2xl font-bold mb-8 text-center">21錠タイプと28錠タイプの違い</h2>
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="grid md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-4 text-primary">21錠タイプ</h3>
                  <p className="text-muted-foreground mb-4">
                    21日間連続で服用した後、7日間お薬を飲まない期間（休薬期間）を設けます。この期間に生理（消退出血）が来ます。
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>7日間の休薬が必要</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>飲み再開の日を忘れないよう注意</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-4 text-primary">28錠タイプ</h3>
                  <p className="text-muted-foreground mb-4">
                    21錠の実薬に加え、7錠の偽薬（プラセボ）が含まれています。休まず毎日飲み続けるため、飲み忘れ防止になります。
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>毎日飲み続ける</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>最後の7錠は成分が入っていない</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Missed Dose */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3">
              <AlertCircle className="h-8 w-8 text-yellow-500" />
              飲み忘れてしまったら？
            </h2>

            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-2 text-yellow-900">1日分（24時間以内）飲み忘れた場合</h3>
                <p className="text-yellow-800">
                  気づいた時点で、飲み忘れた1錠をすぐに服用してください。<br />
                  その日の分も、いつもの時間に服用します（その日は1日2錠飲むことになります）。<br />
                  避妊効果は継続します。
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-2 text-red-900">2日分以上（48時間以上）飲み忘れた場合</h3>
                <p className="text-red-800">
                  服用を中止し、次の生理が来るのを待ってから新しいシートを開始することをお勧めします。<br />
                  その周期の避妊効果は期待できないため、他の避妊法を併用してください。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground text-center">
          <div className="container">
            <h2 className="text-3xl font-bold mb-6">処方には医師の診察が必要です</h2>
            <p className="text-lg mb-8 opacity-90">
              あなたに合ったピルの種類や飲み方について、医師が丁寧に説明します。
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
