import Link from "next/link"
import { MapPin, Phone, ChevronRight, Clock, User, CheckCircle2, Heart } from "lucide-react"

interface ClinicCardProps {
  clinic: {
    id: string
    name: string
    slug: string
    address: string
    station: string
    specialties: string[]
    phone: string | null
    prefecture: string
    city: string
    hours?: string | null
    directorName?: string | null
  }
  rank?: number
  campaign?: string | null
}

export function ClinicCard({ clinic, rank, campaign }: ClinicCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-rose-300 hover:shadow-xl hover:shadow-rose-100/30 transition-all duration-300 group relative overflow-hidden">
      {/* Campaign Badge */}
      {campaign && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-3 py-1 rounded-bl-lg z-10 shadow-sm">
          {campaign}
        </div>
      )}

      {/* Ranking Badge */}
      {rank && (
        <div className="absolute top-0 left-0 bg-slate-800 text-white text-xs font-bold px-3.5 py-1.5 rounded-br-lg z-10">
          {rank}位
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-6 mt-2">
        {/* Image Placeholder */}
        <div className="w-full sm:w-48 h-36 bg-rose-50 rounded-xl flex-shrink-0 flex items-center justify-center text-slate-400 font-bold text-xs border border-slate-50 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
          <div className="text-center z-10">
            <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-white/60 backdrop-blur flex items-center justify-center shadow-sm">
              <Heart size={18} className="text-rose-400" />
            </div>
            <span className="opacity-70">NO IMAGE</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2 pr-16">
              <Link href={`/clinics/${clinic.slug}`}>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-rose-600 transition">{clinic.name}</h3>
              </Link>
            </div>

            {clinic.directorName && (
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium mb-3">
                <User size={13} className="text-rose-500 flex-shrink-0" />
                院長: {clinic.directorName}
              </div>
            )}

            {clinic.specialties.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {clinic.specialties.map((specialty) => (
                  <span key={specialty} className="text-[10px] sm:text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200">
                    {specialty}
                  </span>
                ))}
              </div>
            )}

            <div className="space-y-2 mb-3">
              <div className="flex items-start gap-1.5 text-xs text-slate-600 font-medium">
                <MapPin size={13} className="text-rose-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span>{clinic.address}</span>
                  {clinic.station && (
                    <div className="text-xs text-slate-500 mt-0.5">最寄り: {clinic.station}</div>
                  )}
                </div>
              </div>

              {clinic.hours && (
                <div className="flex items-start gap-1.5 text-xs text-slate-600 font-medium">
                  <Clock size={13} className="text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>{clinic.hours}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-end justify-between pt-4 border-t border-dashed border-slate-100 mt-2">
            <div className="flex gap-2">
              <Link
                href={`/clinics/${clinic.slug}`}
                className="bg-slate-800 hover:bg-rose-500 text-white text-sm font-bold px-6 py-3 rounded-full transition-all shadow-lg shadow-slate-200 flex items-center gap-2 group-hover:shadow-rose-200"
              >
                詳細を見る <ChevronRight size={16} />
              </Link>
              {clinic.phone && (
                <a
                  href={`tel:${clinic.phone}`}
                  className="border-2 border-slate-200 hover:border-rose-500 hover:bg-rose-50 text-slate-700 hover:text-rose-600 text-sm font-bold px-6 py-3 rounded-full transition-all flex items-center gap-2"
                >
                  <Phone size={16} />
                  電話予約
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
