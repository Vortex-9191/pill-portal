import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import StationHeader from "@/components/station-header";
import Breadcrumbs from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getStationBySlug, getClinicsByStation, getAllStationSlugs } from "@/lib/api/stations";
import { notFound } from "next/navigation";
import { ClinicCard } from "@/components/clinic-card"; // existing component

// Types from API
import type { Station, Clinic } from "@/lib/api/stations";

// Generate static params for ISR (popular stations)
export async function generateStaticParams() {
  const slugs = await getAllStationSlugs();
  return slugs.map((s) => ({
    prefecture: s.prefecture,
    city: s.city,
    stationSlug: s.stationSlug,
  }));
}

// SEO metadata
export async function generateMetadata({ params }: { params: { prefecture: string; city: string; stationSlug: string } }) {
  const station = await getStationBySlug(params.stationSlug);
  if (!station) return {};
  const title = `${station.nameKanji}駅周辺のクリニック一覧 | 低用量ピル.com`;
  const description = `${station.nameKanji}駅から徒歩圏内のクリニックを${station.prefecture}・${station.city}エリアで比較できます。内科・小児科・皮膚科などの診療科や診療時間で絞り込み可能です。`;
  const url = `https://pill-portal.com/${params.prefecture}/${params.city}/${params.stationSlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
  };
}

import { ClinicFilters } from "@/components/clinic-filters"; // Import filters

// ... imports

interface Props {
  params: { prefecture: string; city: string; stationSlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function StationPage({ params, searchParams }: Props) {
  const station = await getStationBySlug(params.stationSlug);
  if (!station) notFound();

  // Parse filters from searchParams
  const filters = {
    specialty: typeof searchParams.specialty === "string" ? searchParams.specialty : undefined,
    maxWalkingMinutes: typeof searchParams.walking === "string" ? parseInt(searchParams.walking) : undefined,
    // online is handled by badge or separate logic if needed, but let's pass it if API supports it
    // The API currently supports specialty and maxWalkingMinutes. 
    // We might need to update API for online if strictly required, but let's start with what we have.
  };

  // Fetch clinics with filters
  const clinics: Clinic[] = await getClinicsByStation(station.id, filters);

  // Breadcrumb items
  const breadcrumbItems = [
    { href: "/", label: "ホーム" },
    { href: `/${station.prefecture}/`, label: station.prefecture },
    { href: `/${station.prefecture}/${station.city}/`, label: station.city },
    { href: `/${station.prefecture}/${station.city}/${station.slug}/`, label: `${station.nameKanji}駅` },
  ];

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.label,
          "item": `https://pill-portal.com${item.href}`,
        })),
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `${station.nameKanji}駅近くで内科を探すポイントは？`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "駅から徒歩5分以内の内科クリニックは、通勤・通学の合間に受診しやすくおすすめです。",
            },
          },
          {
            "@type": "Question",
            "name": "仕事帰りに通えるクリニックはありますか？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "夜間診療や土日診療を実施しているクリニックは、駅から徒歩10分以内に多数あります。",
            },
          },
          {
            "@type": "Question",
            "name": "オンライン診療は利用できますか？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "対応クリニックはカードに「Web予約可」や「オンライン診療可」のバッジが表示されます。",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <Breadcrumbs items={breadcrumbItems} />
      <StationHeader station={station} clinicCount={clinics.length} />

      {/* Filter Section */}
      <section className="bg-gray-50 py-6 border-b border-border">
        <div className="container max-w-5xl mx-auto">
          <ClinicFilters />
        </div>
      </section>

      {/* Clinic list */}
      <main className="flex-1 bg-background py-8">
        <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {clinics.map((clinic) => (
            <ClinicCard
              key={clinic.id}
              clinic={{
                id: clinic.id,
                name: clinic.name,
                slug: clinic.slug,
                address: clinic.address,
                station: clinic.station,
                specialties: clinic.specialties,
                phone: clinic.phone ?? null,
                prefecture: clinic.prefecture,
                city: clinic.city,
                // walkingMinutes is not part of original props; we can pass via custom prop if needed
                // For now, we just display via extra info inside CardContent if needed
              }}
            />
          ))}
        </div>
      </main>
      {/* FAQ Section */}
      <section className="bg-secondary/30 py-12">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">{station.nameKanji}駅周辺のよくある質問</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
              <h3 className="font-bold mb-2">{station.nameKanji}駅近くで内科を探すポイントは？</h3>
              <p className="text-muted-foreground">駅から徒歩5分以内の内科クリニックは、通勤・通学の合間に受診しやすくおすすめです。</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
              <h3 className="font-bold mb-2">仕事帰りに通えるクリニックはありますか？</h3>
              <p className="text-muted-foreground">夜間診療や土日診療を実施しているクリニックは、駅から徒歩10分以内に多数あります。</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
              <h3 className="font-bold mb-2">オンライン診療は利用できますか？</h3>
              <p className="text-muted-foreground">対応クリニックはカードに「Web予約可」や「オンライン診療可」のバッジが表示されます。</p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container">
          <h2 className="text-3xl font-bold mb-6">さっそくクリニックを探す</h2>
          <Button size="lg" variant="secondary" className="h-14 px-8 text-lg rounded-full" asChild>
            <Link href="/search">検索ページへ</Link>
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
