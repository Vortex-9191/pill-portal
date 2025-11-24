import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "医療広告ガイドライン | ピルミライ",
  description: "ピルミライにおける医療広告ガイドラインの遵守について。医療法に基づいた適切な情報提供を行っています。",
}

export default function GuidelinesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">医療広告ガイドライン</h1>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <p className="text-muted-foreground mb-4">
                ピルミライは、医療法および「医業若しくは歯科医業又は病院若しくは診療所に関する広告等に関する指針（医療広告ガイドライン）」を遵守し、適切な情報提供を行っています。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">1. 医療広告ガイドラインとは</h2>
              <p className="text-muted-foreground mb-4">
                医療広告ガイドラインは、医療法に基づき、医療機関が行う広告について、虚偽・誇大な広告を規制し、患者が適切な医療機関を選択できるよう、厚生労働省が定めたガイドラインです。
              </p>
              <p className="text-muted-foreground mb-4">
                当サイトは医療機関情報を掲載するポータルサイトとして、このガイドラインの趣旨を理解し、適切な情報提供に努めています。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. 当サイトの基本方針</h2>
              <p className="text-muted-foreground mb-4">当サイトは以下の基本方針に基づき運営しています：</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>客観的で検証可能な事実のみを掲載します</li>
                <li>虚偽や誇大な表現、誤認を招く表現は行いません</li>
                <li>比較優良広告に該当する表現は使用しません</li>
                <li>医療機関の公式情報を基に、正確な情報提供を行います</li>
                <li>特定の治療法や医療機関を不当に優遇する表現は避けます</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. 禁止される広告表現について</h2>
              <p className="text-muted-foreground mb-4">
                医療広告ガイドラインでは、以下のような表現が禁止されています。当サイトではこれらの表現を使用しません：
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-800">3-1. 虚偽広告</h3>
                  <p className="text-muted-foreground mb-2">
                    事実と異なる内容や、誤認させるおそれのある内容の広告
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4 text-sm">
                    <li>「絶対に安全」「必ず効果がある」などの保証表現</li>
                    <li>科学的根拠のない効果・効能の記載</li>
                    <li>誤認させる治療前後の写真の使用</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-800">3-2. 比較優良広告</h3>
                  <p className="text-muted-foreground mb-2">
                    他の医療機関より優良であると誤認させる広告
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4 text-sm">
                    <li>「No.1」「最高」「最適」などの最上級表現</li>
                    <li>客観的事実に基づかないランキング表示</li>
                    <li>他の医療機関と比較する表現</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-800">3-3. 誇大広告</h3>
                  <p className="text-muted-foreground mb-2">
                    事実を誇張したり、過度な期待を持たせる広告
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4 text-sm">
                    <li>効果・効能を過度に強調する表現</li>
                    <li>リスクや副作用の説明を省略した情報</li>
                    <li>「奇跡の」「画期的な」などの誇張表現</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-800">3-4. 患者等の主観に基づく体験談</h3>
                  <p className="text-muted-foreground mb-2">
                    個人の感想や体験談を広告として使用すること
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4 text-sm">
                    <li>患者の体験談や感想文の掲載</li>
                    <li>「口コミ」として個人の主観的な評価を掲載</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. 当サイトにおける情報掲載基準</h2>
              <p className="text-muted-foreground mb-4">
                当サイトでは、以下の基準に基づいて医療機関情報を掲載しています：
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>医療機関の公式ウェブサイトや公開情報を情報源とします</li>
                <li>診療科目、診療時間、所在地などの客観的事実のみを掲載します</li>
                <li>特定の医療機関を推奨する表現は使用しません</li>
                <li>「検索結果」として表示する際も、客観的な基準に基づきます</li>
                <li>広告である場合は明示します</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. 低用量ピルに関する情報提供</h2>
              <p className="text-muted-foreground mb-4">
                当サイトで提供する低用量ピルに関する情報は、一般的な医学情報であり、個別の診断や治療を目的としたものではありません。
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>厚生労働省等の公的機関が公表する情報を基にしています</li>
                <li>効果・効能については一般的な医学的事実のみを記載します</li>
                <li>副作用やリスクについても適切に情報提供します</li>
                <li>具体的な治療方針は医師との相談を推奨します</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. ユーザーレビューについて</h2>
              <p className="text-muted-foreground mb-4">
                現在、当サイトではユーザーレビュー機能を提供していません。これは、医療広告ガイドラインにおいて、患者の主観に基づく体験談が広告として規制されていることを踏まえた措置です。
              </p>
              <p className="text-muted-foreground mb-4">
                医療機関の選択においては、個人の体験談ではなく、客観的な情報と医師との相談を基にしていただくことをお勧めします。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. 広告に関する通報・お問い合わせ</h2>
              <p className="text-muted-foreground mb-4">
                当サイトの掲載内容について、医療広告ガイドラインに抵触する可能性がある表現を発見された場合は、<a href="/contact" className="text-rose-500 hover:underline">お問い合わせフォーム</a>よりご連絡ください。
              </p>
              <p className="text-muted-foreground mb-4">
                医療機関様からの掲載内容の修正・削除依頼も同様に受け付けております。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. 免責事項</h2>
              <p className="text-muted-foreground mb-4">
                当サイトは医療広告ガイドラインの遵守に努めていますが、掲載情報の完全性、正確性、最新性を保証するものではありません。医療機関の受診にあたっては、事前に各医療機関へ直接お問い合わせいただき、最新の情報をご確認ください。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. 参考情報</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>
                  <a
                    href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryou/kokokukisei/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-500 hover:underline"
                  >
                    厚生労働省：医療広告ガイドライン
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.mhlw.go.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-500 hover:underline"
                  >
                    厚生労働省ホームページ
                  </a>
                </li>
              </ul>
            </section>

            <section className="pt-8 border-t">
              <p className="text-muted-foreground">
                制定日：2025年11月24日<br />
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
