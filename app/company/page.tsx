import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "運営会社 | ピルミライ",
  description: "ピルミライの運営会社情報。サービス運営に関する情報をご確認ください。",
}

export default function CompanyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">運営会社</h1>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <p className="text-muted-foreground mb-4">
                ピルミライは、女性の健康課題を解決するための情報ポータルサイトとして、信頼できる医療機関の情報提供と、正しい知識の発信を行っています。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">会社概要</h2>
              <div className="bg-slate-50 p-6 rounded-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="font-semibold text-slate-700">サイト名</div>
                  <div className="md:col-span-3 text-muted-foreground">ピルミライ</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="font-semibold text-slate-700">運営者</div>
                  <div className="md:col-span-3 text-muted-foreground">ピルミライ運営事務局</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="font-semibold text-slate-700">所在地</div>
                  <div className="md:col-span-3 text-muted-foreground">東京都</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="font-semibold text-slate-700">設立</div>
                  <div className="md:col-span-3 text-muted-foreground">2025年</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="font-semibold text-slate-700">事業内容</div>
                  <div className="md:col-span-3 text-muted-foreground">
                    医療機関情報提供サービス<br />
                    女性の健康に関する情報発信<br />
                    ピル・低用量ピルに関する啓発活動
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">サービスの目的</h2>
              <p className="text-muted-foreground mb-4">
                ピルミライは、低用量ピルに関する正確な情報と、信頼できる医療機関の情報を提供することで、女性がより良い健康管理の選択ができるようサポートすることを目的としています。
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>全国の婦人科・レディースクリニック情報の提供</li>
                <li>低用量ピルに関する正確で分かりやすい情報発信</li>
                <li>地域別・駅別での医療機関検索サービス</li>
                <li>オンライン診療対応クリニックの情報提供</li>
                <li>ピルに関する疑問や不安の解消をサポート</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">お問い合わせ</h2>
              <p className="text-muted-foreground mb-4">
                サービスに関するご質問、掲載医療機関様からのお問い合わせは、<a href="/contact" className="text-rose-500 hover:underline">お問い合わせフォーム</a>よりご連絡ください。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">免責事項</h2>
              <p className="text-muted-foreground mb-4">
                当サイトで提供する情報は、一般的な情報提供を目的としたものであり、医学的なアドバイスや診断、治療を目的としたものではありません。個別の健康状態や治療方針については、必ず医療機関を受診し、医師にご相談ください。
              </p>
              <p className="text-muted-foreground mb-4">
                当サイトに掲載されている医療機関の情報については、公開情報をもとに掲載しておりますが、その正確性、最新性、完全性について保証するものではありません。受診される際は、事前に各医療機関へ直接お問い合わせいただくことをお勧めします。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">医療広告ガイドラインの遵守</h2>
              <p className="text-muted-foreground mb-4">
                当サイトは、医療法および医療広告ガイドラインを遵守し、適切な情報提供に努めています。詳細は<a href="/guidelines" className="text-rose-500 hover:underline">医療広告ガイドライン</a>ページをご覧ください。
              </p>
            </section>

            <section className="pt-8 border-t">
              <p className="text-muted-foreground">
                最終更新日：2025年11月24日
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
