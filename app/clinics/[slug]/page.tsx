import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ChevronRight, Phone, ExternalLink, MapPin, Clock, User, Stethoscope, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = await createClient()
  const { data: clinic } = await supabase.from("clinics").select("*").eq("slug", params.slug).single()

  if (!clinic) {
    return {
      title: "クリニックが見つかりません | aga治療.com",
      description: "指定されたクリニックが見つかりませんでした。",
    }
  }

  const specialties = clinic.featured_subjects
    ? clinic.featured_subjects.split(",").map((s: string) => s.trim())
    : []
  const specialtiesText = specialties.length > 0 ? specialties.join("・") : "AGA治療"

  return {
    title: `${clinic.clinic_name} | ${clinic.municipalities} ${specialtiesText} | aga治療.com`,
    description: `${clinic.prefecture}${clinic.municipalities}の${clinic.clinic_name}。${specialtiesText}の診療を行っています。${clinic.stations ? `${clinic.stations}。` : ""}診療時間、アクセス、口コミ情報を掲載。`,
  }
}

export default async function ClinicDetailPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()

  const { data: clinic, error } = await supabase.from("clinics").select("*").eq("slug", params.slug).single()

  if (error || !clinic) {
    console.error("[v0] Error fetching clinic:", error)
    notFound()
  }

  const specialties = clinic.featured_subjects ? clinic.featured_subjects.split(",").map((s: string) => s.trim()) : []

  // Parse business hours by weekday
  const weekdaysMap = [
    { en: 'hours_monday', jp: '月曜' },
    { en: 'hours_tuesday', jp: '火曜' },
    { en: 'hours_wednesday', jp: '水曜' },
    { en: 'hours_thursday', jp: '木曜' },
    { en: 'hours_friday', jp: '金曜' },
    { en: 'hours_saturday', jp: '土曜' },
    { en: 'hours_sunday', jp: '日曜' },
    { en: 'hours_holiday', jp: '祝' },
  ]
  const businessHours: Array<{ day: string; hours: string }> = []
  weekdaysMap.forEach(({ en, jp }) => {
    if (clinic[en] && clinic[en] !== '-') {
      businessHours.push({ day: jp, hours: clinic[en] })
    }
  })

  // Parse specialist info
  const specialists = clinic.specialist_doctors ? clinic.specialist_doctors.split(',').map((s: string) => s.trim()).filter(Boolean) : []
  const diseases = clinic.treatable_diseases ? clinic.treatable_diseases.split(',').map((s: string) => s.trim()).filter(Boolean) : []
  const treatments = clinic.specialized_treatments ? clinic.specialized_treatments.split(',').map((s: string) => s.trim()).filter(Boolean) : []

  return (
    <div className="flex min-h-screen flex-col bg-rose-50/30">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-slate-100 bg-white/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="hover:text-rose-500 transition-colors">
                ホーム
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/areas" className="hover:text-rose-500 transition-colors">
                エリア一覧
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href={`/areas/${clinic.prefecture}`} className="hover:text-rose-500 transition-colors">
                {clinic.prefecture}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-slate-800 font-bold">{clinic.clinic_name}</span>
            </nav>
          </div>
        </div>

        {/* Clinic Header */}
        <div className="border-b border-slate-100 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-800 mb-3 md:text-4xl">{clinic.clinic_name}</h1>

                <div className="flex items-center gap-4 mb-4">
                  {clinic.rating && (
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-lg">★</span>
                      <span className="font-bold text-lg">{clinic.rating}</span>
                      {clinic.review_count && (
                        <span className="text-slate-500 text-sm">({clinic.review_count}件の口コミ)</span>
                      )}
                    </div>
                  )}
                  {specialties.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {specialties.map((specialty) => (
                        <span key={specialty} className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {clinic.director_name && (
                  <div className="flex items-center gap-2 text-sm mb-3">
                    <User className="h-4 w-4 text-rose-500" />
                    <span className="text-slate-600">院長: <span className="text-slate-800 font-bold">{clinic.director_name}</span></span>
                  </div>
                )}

                {clinic.clinic_spec && (
                  <p className="text-slate-600 leading-relaxed mb-4">{clinic.clinic_spec}</p>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-slate-600">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-rose-500" />
                    <div>
                      <p>{clinic.address}</p>
                      {clinic.stations && <p className="mt-1">{clinic.stations}</p>}
                      {clinic.access_info && <p className="mt-1 text-xs">{clinic.access_info}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 lg:w-64">
                {clinic.url && (
                  <a href={clinic.url} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-rose-500 text-white text-sm font-bold px-6 py-3 rounded-full transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 text-center">
                    <ExternalLink className="h-5 w-5" />
                    公式サイト
                  </a>
                )}
                {clinic.corp_tel && (
                  <a href={`tel:${clinic.corp_tel}`} className="border-2 border-slate-200 hover:border-rose-500 hover:bg-rose-50 text-slate-700 hover:text-rose-600 text-sm font-bold px-6 py-3 rounded-full transition-all flex items-center justify-center gap-2 bg-white">
                    <Phone className="h-5 w-5" />
                    電話で予約
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left Column - Info */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Heart size={20} className="text-rose-500" />
                  基本情報
                </h3>
                  <dl className="space-y-4">
                    {clinic.director_name && (
                      <div>
                        <dt className="text-sm font-bold text-slate-500 mb-1">院長名</dt>
                        <dd className="text-slate-800">{clinic.director_name}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm font-bold text-slate-500 mb-1">住所</dt>
                      <dd className="text-slate-800">{clinic.address}</dd>
                    </div>
                    {clinic.stations && (
                      <div>
                        <dt className="text-sm font-bold text-slate-500 mb-1">最寄り駅</dt>
                        <dd className="text-slate-800">{clinic.stations}</dd>
                      </div>
                    )}
                    {clinic.access_info && (
                      <div>
                        <dt className="text-sm font-bold text-slate-500 mb-1">アクセス</dt>
                        <dd className="text-slate-800 text-sm">{clinic.access_info}</dd>
                      </div>
                    )}
                    {clinic.corp_tel && (
                      <div>
                        <dt className="text-sm font-bold text-slate-500 mb-1">電話番号</dt>
                        <dd className="text-slate-800">{clinic.corp_tel}</dd>
                      </div>
                    )}
                    {clinic.featured_subjects && (
                      <div>
                        <dt className="text-sm font-bold text-slate-500 mb-1">診療科目</dt>
                        <dd className="text-slate-800">{clinic.featured_subjects}</dd>
                      </div>
                    )}
                    {clinic.non_medical_response && (
                      <div>
                        <dt className="text-sm font-bold text-slate-500 mb-1">対応</dt>
                        <dd className="text-slate-800">{clinic.non_medical_response}</dd>
                      </div>
                    )}
                    {clinic.homepage_url && (
                      <div>
                        <dt className="text-sm font-bold text-slate-500 mb-1">ホームページ</dt>
                        <dd>
                          <a
                            href={clinic.homepage_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-rose-500 hover:text-rose-600 hover:underline"
                          >
                            {clinic.homepage_url}
                          </a>
                        </dd>
                      </div>
                    )}
                    {clinic.closed_days && clinic.closed_days !== '-' && (
                      <div>
                        <dt className="text-sm font-bold text-slate-500 mb-1">休診日</dt>
                        <dd className="text-slate-800">{clinic.closed_days}</dd>
                      </div>
                    )}
                    {clinic.notes && clinic.notes !== '-' && (
                      <div>
                        <dt className="text-sm font-bold text-slate-500 mb-1">備考</dt>
                        <dd className="text-slate-800 whitespace-pre-wrap">{clinic.notes}</dd>
                      </div>
                    )}
                  </dl>
              </div>

              {/* Business Hours */}
              {businessHours.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-rose-500" />
                    診療時間
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="text-left py-2 px-3 font-bold text-slate-500">曜日</th>
                          <th className="text-left py-2 px-3 font-bold text-slate-500">診療時間</th>
                        </tr>
                      </thead>
                      <tbody>
                        {businessHours.map(({ day, hours }) => (
                          <tr key={day} className="border-b border-slate-50 last:border-0">
                            <td className="py-3 px-3 font-bold text-slate-700">{day}</td>
                            <td className="py-3 px-3 text-slate-600">{hours}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Specialist Info */}
              {(specialists.length > 0 || diseases.length > 0 || treatments.length > 0) && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-rose-500" />
                    専門的な情報
                  </h3>
                  <div className="space-y-4">
                    {specialists.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-slate-500 mb-2">専門医</h4>
                        <div className="flex flex-wrap gap-2">
                          {specialists.map((specialist, i) => (
                            <span key={i} className="text-xs font-bold bg-rose-50 text-rose-600 px-2.5 py-1 rounded-md border border-rose-200">{specialist}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {diseases.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-slate-500 mb-2">対応可能な疾患</h4>
                        <div className="flex flex-wrap gap-2">
                          {diseases.map((disease, i) => (
                            <span key={i} className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200">{disease}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {treatments.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-slate-500 mb-2">専門的な治療</h4>
                        <div className="flex flex-wrap gap-2">
                          {treatments.map((treatment, i) => (
                            <span key={i} className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200">{treatment}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Features/Characteristics */}
              {clinic.features && clinic.features !== '-' && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-rose-500" />
                    クリニックの特徴
                  </h3>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{clinic.features}</p>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <aside className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
                <h3 className="text-lg font-bold text-slate-800 mb-4">予約・お問い合わせ</h3>
                <div className="space-y-3">
                  {clinic.url && (
                    <a href={clinic.url} target="_blank" rel="noopener noreferrer" className="w-full bg-slate-800 hover:bg-rose-500 text-white text-sm font-bold px-6 py-3 rounded-full transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2">
                      <ExternalLink className="h-5 w-5" />
                      公式サイト
                    </a>
                  )}
                  {clinic.corp_tel && (
                    <a href={`tel:${clinic.corp_tel}`} className="w-full border-2 border-slate-200 hover:border-rose-500 hover:bg-rose-50 text-slate-700 hover:text-rose-600 text-sm font-bold px-6 py-3 rounded-full transition-all flex items-center justify-center gap-2 bg-white">
                      <Phone className="h-5 w-5" />
                      {clinic.corp_tel}
                    </a>
                  )}
                </div>
              </div>

              {/* Google Maps */}
              {clinic.address && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-6 pb-4">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-rose-500" />
                      アクセスマップ
                    </h3>
                  </div>
                  <iframe
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(
                      clinic.address
                    )}`}
                  />
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
