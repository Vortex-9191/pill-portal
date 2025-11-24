import { ClinicCard } from "@/components/clinic-card"
import Link from "next/link"
import { ChevronRight, MapPin, Train } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SearchFilters } from "@/components/search-filters"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getStationSlug } from "@/lib/data/stations"
import { ClinicFinderWrapper } from "@/components/clinic-finder-wrapper"
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
    title: `${prefectureName}の低用量ピル処方クリニック一覧 | 低用量ピル.com`,
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

  // Note: 'feature', 'weekend', 'evening', 'director' filters are tricky with the current simple JSON structure
  // The scraper populates 'badge' which might contain some features.
  // 'hours' are not fully parsed in the current scraper (it's just a placeholder or partial).
  // We will implement basic filtering where possible.

  if (searchParams.feature) {
    filteredClinics = filteredClinics.filter(c =>
      c.badge && c.badge.some((b: string) => b.includes(searchParams.feature!))
    )
  }

  const totalCount = filteredClinics.length
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const from = (currentPage - 1) * ITEMS_PER_PAGE
  const to = Math.min(from + ITEMS_PER_PAGE, totalCount)

  const paginatedClinics = filteredClinics.slice(from, to)

  // Calculate facets from prefectureClinics (before other filters, to show available options)
  const uniqueCities = Array.from(new Set(prefectureClinics.map((c: any) => c.city).filter(Boolean))).sort() as string[]

  const specialtyMap = new Map<string, number>()
  prefectureClinics.forEach((c: any) => {
    if (c.specialties) {
      c.specialties.forEach((s: string) => {
        specialtyMap.set(s, (specialtyMap.get(s) || 0) + 1)
      })
    }
  })

  const featureMap = new Map<string, number>()
  prefectureClinics.forEach((c: any) => {
    if (c.badge) {
      c.badge.forEach((b: string) => {
        featureMap.set(b, (featureMap.get(b) || 0) + 1)
      })
    }
  })

  const facetData = {
    prefectures: [],
    cities: uniqueCities,
    specialties: Array.from(specialtyMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
    features: Array.from(featureMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
    weekend: 0, // Not implemented in scraper yet
    evening: 0, // Not implemented in scraper yet
    director: 0, // Not implemented in scraper yet
  }

  // Related Municipalities (Cities)
  const relatedMunicipalities = uniqueCities.map(city => ({
    name: city,
    count: prefectureClinics.filter((c: any) => c.city === city).length
  })).sort((a, b) => b.count - a.count).slice(0, 10)

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
    hours: "診療時間は詳細をご確認ください", // Placeholder
    directorName: null, // Not scraped
    ...clinic // Pass other props
  }))

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                ホーム
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/areas" className="hover:text-foreground transition-colors">
                エリア一覧
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{prefectureName}</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <div className="border-b border-border bg-secondary/20">
          <div className="container py-12">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">{prefectureName}のクリニック</h1>
            </div>
            <p className="text-lg text-muted-foreground">{totalCount}件のクリニック</p>
          </div>
        </div>

        <div className="container py-12">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Facet Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <SearchFilters facets={facetData} />
              </div>
            </aside>

            {/* Clinic List */}
            <div>
              {/* Clinic Finder Wizard */}
              <ClinicFinderWrapper />

              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {totalCount}件中 {from + 1}〜{Math.min(to, totalCount)}件を表示
                </p>
              </div>

              <div className="space-y-4">
                {clinicCards.length > 0 ? (
                  clinicCards.map((clinic: any) => <ClinicCard key={clinic.id} clinic={clinic} />)
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">条件に一致するクリニックが見つかりませんでした。</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  {currentPage > 1 && (
                    <Link href={`/areas/${params.prefecture}?page=${currentPage - 1}`}>
                      <Button variant="outline">前へ</Button>
                    </Link>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {currentPage} / {totalPages}
                  </span>
                  {currentPage < totalPages && (
                    <Link href={`/areas/${params.prefecture}?page=${currentPage + 1}`}>
                      <Button variant="outline">次へ</Button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Related Municipalities and Stations Section */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Related Municipalities */}
            {relatedMunicipalities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {prefectureName}の市区町村
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                    {relatedMunicipalities.map((municipality) => (
                      <Link
                        key={municipality.name}
                        href={`/areas/${params.prefecture}?city=${encodeURIComponent(municipality.name)}`}
                        className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent hover:border-coral transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-coral flex-shrink-0 transition-colors" />
                          <span className="text-sm font-medium group-hover:text-coral transition-colors">{municipality.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground bg-muted group-hover:bg-coral/10 px-2 py-1 rounded transition-colors">
                          {municipality.count}件
                        </span>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Related Stations */}
            {relatedStations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Train className="h-5 w-5" />
                    {prefectureName}の主要駅
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                    {relatedStations.map((station) => {
                      // Note: We don't have station slugs in this context easily unless we look them up.
                      // For now, we'll link to the station page if we can derive the slug, or just search.
                      // The scraper generates stationSlug in the clinic object.
                      // Let's try to find a clinic with this station to get the slug.
                      const sampleClinic = prefectureClinics.find((c: any) => c.station === station.name);
                      const stationSlug = sampleClinic?.stationSlug || getStationSlug(station.name);

                      return (
                        <Link
                          key={station.name}
                          href={`/${PREFECTURE_SLUGS[prefectureName] || 'tokyo'}/${sampleClinic?.city || 'city'}/${stationSlug}`}
                          className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent hover:border-coral transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <Train className="h-4 w-4 text-muted-foreground group-hover:text-coral flex-shrink-0 transition-colors" />
                            <span className="text-sm font-medium group-hover:text-coral transition-colors">{station.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground bg-muted group-hover:bg-coral/10 px-2 py-1 rounded transition-colors">
                            {station.count}件
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
