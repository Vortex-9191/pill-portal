import { ClinicCard } from "@/components/clinic-card"
import Link from "next/link"
import { ChevronRight, MapPin, Train, Filter, Clock, ThumbsUp } from "lucide-react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getStationSlug } from "@/lib/data/stations"
import { getClinicsData, PREFECTURE_SLUGS } from "@/lib/api/locations"

// Prefecture slug to name mapping
const prefectureMap: Record<string, string> = {
  hokkaido: "北海道",
  aomori: "青森県",
  iwate: "岩手県",
  miyagi: "宮城県",
  akita: "秋田県",
  yamagata: "山形県",
  fukushima: "福島県",
  ibaraki: "茨城県",
  tochigi: "栃木県",
  gunma: "群馬県",
  saitama: "埼玉県",
  chiba: "千葉県",
  tokyo: "東京都",
  kanagawa: "神奈川県",
  niigata: "新潟県",
  toyama: "富山県",
  ishikawa: "石川県",
  fukui: "福井県",
  yamanashi: "山梨県",
  nagano: "長野県",
  gifu: "岐阜県",
  shizuoka: "静岡県",
  aichi: "愛知県",
  mie: "三重県",
  shiga: "滋賀県",
  kyoto: "京都府",
  osaka: "大阪府",
  hyogo: "兵庫県",
  nara: "奈良県",
  wakayama: "和歌山県",
  tottori: "鳥取県",
  shimane: "島根県",
  okayama: "岡山県",
  hiroshima: "広島県",
  yamaguchi: "山口県",
  tokushima: "徳島県",
  kagawa: "香川県",
  ehime: "愛媛県",
  kochi: "高知県",
  fukuoka: "福岡県",
  saga: "佐賀県",
  nagasaki: "長崎県",
  kumamoto: "熊本県",
  oita: "大分県",
  miyazaki: "宮崎県",
  kagoshima: "鹿児島県",
  okinawa: "沖縄県",
}

export async function generateMetadata({ params }: { params: { prefecture: string } }): Promise<Metadata> {
  const prefectureName = prefectureMap[params.prefecture] || "都道府県"

  return {
    title: `${prefectureName}の低用量ピル処方クリニック一覧 | ピルミライ`,
    description: `${prefectureName}の低用量ピル処方クリニック一覧。診療時間、住所、アクセス情報を掲載。`,
  }
}

const ITEMS_PER_PAGE = 15

export default async function PrefecturePage({
  params,
  searchParams,
}: {
  params: { prefecture: string }
  searchParams: {
    page?: string
    city?: string
    specialty?: string
    feature?: string
    weekend?: string
    evening?: string
    director?: string
  }
}) {
  const prefectureName = prefectureMap[params.prefecture]

  if (!prefectureName) {
    notFound()
  }

  const allClinicsData = await getClinicsData()
  console.log(`[AreaPage] Fetched ${allClinicsData.length} clinics`)
  const currentPage = Number(searchParams.page) || 1

  // Filter by prefecture
  let prefectureClinics = allClinicsData.filter((c: any) => c.prefecture === prefectureName)
  console.log(`[AreaPage] Found ${prefectureClinics.length} clinics for ${prefectureName}`)

  // Apply filters
  let filteredClinics = [...prefectureClinics]

  if (searchParams.city) {
    filteredClinics = filteredClinics.filter(c => c.city === searchParams.city)
  }

  if (searchParams.specialty) {
    filteredClinics = filteredClinics.filter(c =>
      c.specialties && c.specialties.some((s: string) => s.includes(searchParams.specialty!))
    )
  }

  if (searchParams.feature) {
    filteredClinics = filteredClinics.filter(c =>
      c.badge && c.badge.some((b: string) => b.includes(searchParams.feature!))
    )
  }

  const weekend = searchParams.weekend === 'true'
  const evening = searchParams.evening === 'true'
  const hasDirector = searchParams.director === 'true'

  const totalCount = filteredClinics.length
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const from = (currentPage - 1) * ITEMS_PER_PAGE
  const to = Math.min(from + ITEMS_PER_PAGE, totalCount)

  const paginatedClinics = filteredClinics.slice(from, to)

  // Calculate facets from prefectureClinics (before other filters, to show available options)
  const uniqueCities = Array.from(new Set(prefectureClinics.map((c: any) => c.city).filter(Boolean))).sort() as string[]

  // Related Municipalities (Cities) - top 6 for chips display
  const relatedMunicipalities = uniqueCities.map(city => ({
    name: city,
    count: prefectureClinics.filter((c: any) => c.city === city).length
  })).sort((a, b) => b.count - a.count).slice(0, 6)

  // Related Stations
  const stationMap = new Map<string, number>()
  prefectureClinics.forEach((c: any) => {
    if (c.station) {
      stationMap.set(c.station, (stationMap.get(c.station) || 0) + 1)
    }
  })
  const relatedStations = Array.from(stationMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // Transform for ClinicCard
  const clinicCards = paginatedClinics.map((clinic: any) => ({
    id: clinic.id,
    name: clinic.name,
    slug: clinic.slug,
    address: clinic.address,
    station: clinic.station,
    specialties: clinic.specialties || [],
    phone: clinic.phone,
    prefecture: clinic.prefecture,
    city: clinic.city,
    hours: "診療時間は詳細をご確認ください",
    directorName: null,
    ...clinic
  }))

  return (
    <div className="min-h-screen bg-slate-50 animate-in fade-in duration-500 pb-20 md:pb-0">
      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="bg-white pt-3 px-4 md:px-8 text-xs font-bold text-slate-400 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="cursor-pointer hover:text-rose-500 transition-colors">TOP</Link>
          <ChevronRight size={10} />
          <Link href="/areas" className="hover:text-rose-500 cursor-pointer transition-colors">エリア一覧</Link>
          <ChevronRight size={10} />
          <span className="text-slate-800">{prefectureName}</span>
        </div>

        {/* Hero Header with Gradient */}
        <div className="relative bg-gradient-to-r from-rose-50 to-indigo-50 px-4 md:px-8 py-8 border-b border-rose-100 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-6xl mx-auto">
              <div>
                <span className="text-rose-500 font-bold text-xs tracking-wider uppercase mb-1 block">
                  {prefectureName.toUpperCase()}
                </span>
                <h1 className="font-bold text-2xl md:text-3xl text-slate-800 leading-tight">
                  {prefectureName}のピル処方クリニック
                </h1>
                <p className="text-slate-500 text-xs font-bold mt-2 flex items-center gap-2">
                  <span className="bg-white px-2 py-0.5 rounded-full shadow-sm text-slate-600">
                    {totalCount}件見つかりました
                  </span>
                </p>
              </div>
            </div>

            {/* Nearby Cities Chips */}
            {relatedMunicipalities.length > 0 && (
              <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1 max-w-6xl mx-auto">
                <span className="text-xs font-bold text-slate-400 flex items-center shrink-0">
                  <MapPin size={12} className="mr-1"/> 市区町村:
                </span>
                {relatedMunicipalities.map((city, i) => (
                  <Link
                    key={i}
                    href={`/areas/${params.prefecture}?city=${encodeURIComponent(city.name)}`}
                    className="text-xs bg-white/60 hover:bg-white border border-slate-200/50 rounded-full px-3 py-1 text-slate-600 font-medium transition-colors whitespace-nowrap"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sticky Filter Bar */}
        <div className="sticky top-16 z-40 bg-white/95 backdrop-blur border-b border-gray-100 py-3 overflow-x-auto no-scrollbar shadow-sm">
          <div className="flex items-center gap-2 px-4 md:px-8 w-max max-w-6xl mx-auto">
            <button className="flex items-center gap-1.5 bg-slate-800 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md shadow-slate-200 active:scale-95 transition-transform">
              <Filter size={12} /> 絞り込み
            </button>

            <div className="w-px h-4 bg-slate-200 mx-1"></div>

            <Link
              href={`/areas/${params.prefecture}?${new URLSearchParams({ ...searchParams, weekend: weekend ? '' : 'true' }).toString()}`}
              className={`${weekend ? 'bg-rose-500 text-white border-rose-500' : 'bg-white border-slate-200 text-slate-600 hover:border-rose-200 hover:text-rose-600 hover:bg-rose-50'} border px-4 py-1.5 rounded-full text-xs font-bold transition-all`}
            >
              土日診療可
            </Link>
            <Link
              href={`/areas/${params.prefecture}?${new URLSearchParams({ ...searchParams, evening: evening ? '' : 'true' }).toString()}`}
              className={`${evening ? 'bg-rose-500 text-white border-rose-500' : 'bg-white border-slate-200 text-slate-600 hover:border-rose-200 hover:text-rose-600 hover:bg-rose-50'} border px-4 py-1.5 rounded-full text-xs font-bold transition-all`}
            >
              20時以降
            </Link>
            <Link
              href={`/areas/${params.prefecture}?${new URLSearchParams({ ...searchParams, director: hasDirector ? '' : 'true' }).toString()}`}
              className={`${hasDirector ? 'bg-rose-500 text-white border-rose-500' : 'bg-white border-slate-200 text-slate-600 hover:border-rose-200 hover:text-rose-600 hover:bg-rose-50'} border px-4 py-1.5 rounded-full text-xs font-bold transition-all`}
            >
              女性医師
            </Link>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 pt-6 pb-20 md:pb-8">
          {/* Editor's Pick - Show first clinic as highlighted if exists */}
          {clinicCards.length > 0 && (
            <div
              className="mb-8 border border-rose-100 bg-gradient-to-br from-white to-rose-50/50 rounded-2xl p-5 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="absolute top-0 left-0 bg-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-br-lg z-10 flex items-center gap-1">
                <ThumbsUp size={10} /> 迷ったらココ！
              </div>
              <Link href={`/clinics/${clinicCards[0].slug}`} className="block">
                <div className="flex items-start gap-4 mt-2">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-rose-500 shadow-md border border-rose-50 shrink-0">
                    <span className="text-2xl">🏥</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">{clinicCards[0].name}</h3>
                    <p className="text-xs text-slate-500 mb-2 font-medium">
                      {clinicCards[0].address.substring(0, 50)}...
                    </p>
                    <div className="flex gap-2">
                      {clinicCards[0].station && (
                        <span className="text-[10px] bg-white border border-rose-100 text-rose-500 px-2 py-0.5 rounded-md font-bold">
                          {clinicCards[0].station}
                        </span>
                      )}
                      {clinicCards[0].specialties && clinicCards[0].specialties.length > 0 && (
                        <span className="text-[10px] bg-white border border-rose-100 text-rose-500 px-2 py-0.5 rounded-md font-bold">
                          {clinicCards[0].specialties[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Hurry Banner */}
          {totalCount > 0 && (
            <div className="mb-6 flex items-start gap-3 bg-amber-50 p-4 rounded-xl border border-amber-100">
              <div className="bg-white p-2 rounded-full shadow-sm text-amber-500 shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-900 mb-0.5">お急ぎですか？</p>
                <p className="text-xs text-amber-800/80 leading-relaxed">
                  近くで「今すぐ」予約可能な病院が見つかるかもしれません。
                  <span className="underline cursor-pointer font-bold ml-1 hover:text-amber-600">空き状況を見る</span>
                </p>
              </div>
            </div>
          )}

          {/* Clinic Cards */}
          <div className="space-y-5">
            {clinicCards.length > 0 ? (
              clinicCards.map((clinic: any, idx: number) => (
                <ClinicCard
                  key={clinic.id}
                  rank={idx + 1}
                  clinic={clinic}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                <p className="text-slate-500 font-medium">
                  検索条件に一致するクリニックが見つかりませんでした。
                </p>
              </div>
            )}
          </div>

          {/* Native Ad Insert (after 5 clinics) */}
          {clinicCards.length > 5 && (
            <div className="my-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white text-center shadow-xl shadow-slate-200 overflow-hidden relative group cursor-pointer transition-transform hover:scale-[1.01]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 text-left">
                <div>
                  <p className="font-bold text-sm mb-1 text-rose-300">通院の時間がない方へ</p>
                  <h3 className="text-lg font-bold mb-2">スマホで完結、お薬はポストへ。</h3>
                  <p className="text-xs text-slate-300 font-medium">オンライン診療なら待ち時間0分で受診可能です。</p>
                </div>
                <button className="bg-white text-slate-900 text-xs font-bold px-6 py-3 rounded-full hover:bg-rose-50 hover:text-rose-600 transition-colors shrink-0 shadow-lg flex items-center gap-2">
                  <span>📱</span>
                  オンライン診療を見る
                </button>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={`/areas/${params.prefecture}?page=${currentPage - 1}`}
                  className="bg-white border border-slate-200 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600 px-4 py-2 rounded-lg text-sm font-bold transition"
                >
                  前へ
                </Link>
              )}
              <span className="text-sm text-slate-500 font-medium px-4">
                {currentPage} / {totalPages}
              </span>
              {currentPage < totalPages && (
                <Link
                  href={`/areas/${params.prefecture}?page=${currentPage + 1}`}
                  className="bg-white border border-slate-200 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600 px-4 py-2 rounded-lg text-sm font-bold transition"
                >
                  次へ
                </Link>
              )}
            </div>
          )}

          {/* Related Stations Section */}
          {relatedStations.length > 0 && (
            <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                <Train className="h-5 w-5 text-rose-500" />
                {prefectureName}の主要駅からクリニックを探す
              </h2>
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                {relatedStations.map((station) => {
                  const sampleClinic = prefectureClinics.find((c: any) => c.station === station.name);
                  const stationSlug = sampleClinic?.stationSlug || getStationSlug(station.name);

                  return (
                    <Link
                      key={station.name}
                      href={`/${PREFECTURE_SLUGS[prefectureName] || 'tokyo'}/${sampleClinic?.city || 'city'}/${stationSlug}`}
                      className="flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:bg-rose-50 hover:border-rose-200 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Train className="h-4 w-4 text-slate-400 group-hover:text-rose-500 flex-shrink-0 transition-colors" />
                        <span className="text-sm font-medium group-hover:text-rose-600 transition-colors">{station.name}</span>
                      </div>
                      <span className="text-xs text-slate-400 bg-slate-50 group-hover:bg-rose-100 group-hover:text-rose-600 px-2 py-1 rounded transition-colors font-bold">
                        {station.count}件
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
