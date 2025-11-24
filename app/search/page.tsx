import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClinicCard } from "@/components/clinic-card"
import { SearchForm } from "@/components/search-form"
import { Pagination } from "@/components/pagination"
import { Filter, ChevronRight, Train, Clock, ThumbsUp } from "lucide-react"
import { searchClinics, getPrefectureCounts } from "@/lib/api/clinics"
import { SortSelect } from "@/components/sort-select"
import type { Metadata } from "next"

const ITEMS_PER_PAGE = 15

// Force dynamic rendering to avoid build-time static generation
export const dynamic = 'force-dynamic'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q?: string; prefecture?: string }
}): Promise<Metadata> {
  const query = searchParams.q || ""
  const prefecture = searchParams.prefecture || ""

  if (query) {
    return {
      title: `「${query}」のクリニック検索結果 | ピルミライ`,
      description: `「${query}」に関連する低用量ピル処方クリニックの検索結果。オンライン診療対応、即日発送など、条件に合わせてクリニックを探せます。`,
    }
  } else if (prefecture) {
    return {
      title: `${prefecture}の低用量ピル処方クリニック | ピルミライ`,
      description: `${prefecture}の低用量ピル処方クリニックを検索。${prefecture}で評判のクリニックの診療時間、住所、アクセス、口コミ情報を掲載。`,
    }
  }

  return {
    title: `クリニック検索 | ピルミライ`,
    description: `全国の低用量ピル処方クリニックを検索。地域、駅名からクリニックを探せます。オンライン診療、即日発送など、あなたのライフスタイルに合ったクリニックが見つかります。`,
  }
}

interface Clinic {
  id: number
  clinic_name: string
  address: string
  stations: string
  phone_number: string
  hours_monday: string
  hours_tuesday: string
  hours_wednesday: string
  hours_thursday: string
  hours_friday: string
  hours_saturday: string
  hours_sunday: string
  hours_holiday: string
  director_name: string
  featured_subjects: string
  slug: string
  prefecture: string
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {
    q?: string
    prefecture?: string
    specialty?: string
    weekend?: string
    evening?: string
    director?: string
    page?: string
    sort?: string
  }
}) {
  const query = searchParams.q || ""
  const prefecture = searchParams.prefecture || ""
  const specialty = searchParams.specialty || ""
  const weekend = searchParams.weekend === 'true'
  const evening = searchParams.evening === 'true'
  const hasDirector = searchParams.director === 'true'
  const sort = searchParams.sort || "recommended"
  const currentPage = Number(searchParams.page) || 1

  // Fetch clinics and prefecture counts in parallel
  const [clinicsResult, prefectureCounts] = await Promise.all([
    searchClinics({
      q: query,
      prefecture,
      specialty,
      weekend,
      evening,
      director: hasDirector,
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      sort,
    }),
    getPrefectureCounts()
  ])

  const { data: clinicsData, count } = clinicsResult
  const clinics = clinicsData as Clinic[]

  const totalCount = count || 0
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)
  const from = (currentPage - 1) * ITEMS_PER_PAGE
  const to = from + (clinics?.length || 0)

  // Example nearby areas - in real app, this would be dynamic based on location
  const nearbyAreas = ["渋谷", "新宿", "池袋", "品川", "恵比寿", "六本木"]

  return (
    <div className="min-h-screen bg-slate-50 animate-in fade-in duration-500 pb-20 md:pb-0">
      <Header />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="bg-white pt-3 px-4 md:px-8 text-xs font-bold text-slate-400 flex items-center gap-1.5 flex-wrap">
          <a href="/" className="cursor-pointer hover:text-rose-500 transition-colors">TOP</a>
          <ChevronRight size={10} />
          {prefecture && (
            <>
              <span className="hover:text-rose-500 cursor-pointer transition-colors">{prefecture}</span>
              <ChevronRight size={10} />
            </>
          )}
          <span className="text-slate-800">検索</span>
        </div>

        {/* Hero Header with Gradient */}
        <div className="relative bg-gradient-to-r from-rose-50 to-indigo-50 px-4 md:px-8 py-8 border-b border-rose-100 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-6xl mx-auto">
              <div>
                <span className="text-rose-500 font-bold text-xs tracking-wider uppercase mb-1 block">
                  {prefecture || 'SEARCH RESULTS'}
                </span>
                <h1 className="font-bold text-2xl md:text-3xl text-slate-800 leading-tight">
                  {query ? `「${query}」の検索結果` : prefecture ? `${prefecture}のピル処方クリニック` : "クリニック検索"}
                </h1>
                <p className="text-slate-500 text-xs font-bold mt-2 flex items-center gap-2">
                  <span className="bg-white px-2 py-0.5 rounded-full shadow-sm text-slate-600">
                    {totalCount || 0}件見つかりました
                  </span>
                </p>
              </div>
            </div>

            {/* Nearby Areas Chips */}
            {nearbyAreas.length > 0 && (
              <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1 max-w-6xl mx-auto">
                <span className="text-xs font-bold text-slate-400 flex items-center shrink-0">
                  <Train size={12} className="mr-1"/> 近隣エリア:
                </span>
                {nearbyAreas.map((station, i) => (
                  <button
                    key={i}
                    className="text-xs bg-white/60 hover:bg-white border border-slate-200/50 rounded-full px-3 py-1 text-slate-600 font-medium transition-colors whitespace-nowrap"
                  >
                    {station}
                  </button>
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

            <SortSelect />

            <div className="w-px h-4 bg-slate-200 mx-1"></div>

            <a
              href={`/search?${new URLSearchParams({ ...searchParams, weekend: weekend ? '' : 'true' }).toString()}`}
              className={`${weekend ? 'bg-rose-500 text-white border-rose-500' : 'bg-white border-slate-200 text-slate-600 hover:border-rose-200 hover:text-rose-600 hover:bg-rose-50'} border px-4 py-1.5 rounded-full text-xs font-bold transition-all`}
            >
              土日診療可
            </a>
            <a
              href={`/search?${new URLSearchParams({ ...searchParams, evening: evening ? '' : 'true' }).toString()}`}
              className={`${evening ? 'bg-rose-500 text-white border-rose-500' : 'bg-white border-slate-200 text-slate-600 hover:border-rose-200 hover:text-rose-600 hover:bg-rose-50'} border px-4 py-1.5 rounded-full text-xs font-bold transition-all`}
            >
              20時以降
            </a>
            <a
              href={`/search?${new URLSearchParams({ ...searchParams, director: hasDirector ? '' : 'true' }).toString()}`}
              className={`${hasDirector ? 'bg-rose-500 text-white border-rose-500' : 'bg-white border-slate-200 text-slate-600 hover:border-rose-200 hover:text-rose-600 hover:bg-rose-50'} border px-4 py-1.5 rounded-full text-xs font-bold transition-all`}
            >
              女性医師
            </a>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 pt-6 pb-20 md:pb-8">
          {/* Editor's Pick - Show first clinic as highlighted if exists */}
          {clinics && clinics.length > 0 && (
            <div
              className="mb-8 border border-rose-100 bg-gradient-to-br from-white to-rose-50/50 rounded-2xl p-5 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="absolute top-0 left-0 bg-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-br-lg z-10 flex items-center gap-1">
                <ThumbsUp size={10} /> 迷ったらココ！
              </div>
              <a href={`/clinics/${clinics[0].slug}`} className="block">
                <div className="flex items-start gap-4 mt-2">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-rose-500 shadow-md border border-rose-50 shrink-0">
                    <span className="text-2xl">🏥</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">{clinics[0].clinic_name}</h3>
                    <p className="text-xs text-slate-500 mb-2 font-medium">
                      {clinics[0].address.substring(0, 50)}...
                    </p>
                    <div className="flex gap-2">
                      {clinics[0].director_name && (
                        <span className="text-[10px] bg-white border border-rose-100 text-rose-500 px-2 py-0.5 rounded-md font-bold">
                          院長: {clinics[0].director_name}
                        </span>
                      )}
                      {clinics[0].featured_subjects && (
                        <span className="text-[10px] bg-white border border-rose-100 text-rose-500 px-2 py-0.5 rounded-md font-bold">
                          {clinics[0].featured_subjects.split(',')[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </a>
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
            {clinics && clinics.length > 0 ? (
              clinics.map((clinic, idx) => {
                // Get first weekday with hours for display
                const weekdays = [
                  { en: 'hours_monday' as const, jp: '月曜' },
                  { en: 'hours_tuesday' as const, jp: '火曜' },
                  { en: 'hours_wednesday' as const, jp: '水曜' },
                  { en: 'hours_thursday' as const, jp: '木曜' },
                  { en: 'hours_friday' as const, jp: '金曜' },
                  { en: 'hours_saturday' as const, jp: '土曜' },
                ]
                // @ts-ignore - dynamic access
                const firstHours = weekdays.find(day => clinic[day.en] && clinic[day.en] !== '-')
                // @ts-ignore - dynamic access
                const hours = firstHours ? `${firstHours.jp}: ${clinic[firstHours.en]}` : null
                const specialties = clinic.featured_subjects ? clinic.featured_subjects.split(',').map((s) => s.trim()) : []
                const phoneNumber = clinic.phone_number || null
                // Simple city extraction
                const city = clinic.address.split(clinic.prefecture)[1]?.split(/市|区|町|村/)[0] + (clinic.address.match(/市|区|町|村/)?.[0] || '') || ''

                return (
                  <ClinicCard
                    key={clinic.id}
                    rank={idx + 1}
                    clinic={{
                      id: String(clinic.id),
                      name: clinic.clinic_name,
                      slug: clinic.slug,
                      address: clinic.address,
                      station: clinic.stations,
                      specialties: specialties,
                      phone: phoneNumber,
                      prefecture: clinic.prefecture,
                      city: city,
                      hours: hours,
                      directorName: clinic.director_name,
                    }}
                  />
                )
              })
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                <p className="text-slate-500 font-medium">
                  検索条件に一致するクリニックが見つかりませんでした。
                </p>
              </div>
            )}
          </div>

          {/* Native Ad Insert (after 5 clinics) */}
          {clinics && clinics.length > 5 && (
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
            <div className="pt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
