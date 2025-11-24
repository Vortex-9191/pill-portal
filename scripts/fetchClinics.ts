// scripts/fetchClinics.ts

import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { writeFileSync } from "fs";
import { join } from "path";

// Target URL – main page that lists stations/areas
const BASE_URL = "https://yokohama-ekimae.net/pillarea/";

// Helper to fetch HTML
async function fetchHTML(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

// Very simple parser – extracts station links from the "主要エリア・駅から探す" section
async function parseStations(html: string): Promise<Array<{ name: string; slug: string }>> {
  const $ = cheerio.load(html);
  const stations: Array<{ name: string; slug: string }> = [];
  // The site uses <a> links under the section heading "主要エリア・駅から探す"
  $("h2:contains('主要エリア・駅から探す')")
    .nextAll("ul")
    .first()
    .find("a")
    .each((_i, el) => {
      const href = $(el).attr("href") || "";
      const name = $(el).text().trim();
      // Expect href like "/pillarea/主要エリア・駅から探す/神奈川県"
      const slugMatch = href.match(/\/([^/]+)\/?$/);
      const slug = slugMatch ? slugMatch[1] : name.replace(/\s+/g, "-").toLowerCase();
      stations.push({ name, slug });
    });
  return stations;
}

// Mock clinic extraction – in real case you would fetch each station page and parse clinic cards
function mockClinicsForStation(station: { name: string; slug: string }) {
  return [
    {
      id: `${station.slug}-c1`,
      name: `${station.name}クリニック`,
      slug: `${station.slug}-clinic`,
      address: `${station.name}駅周辺 1-1-1`,
      station: station.name,
      specialties: ["内科", "産婦人科"],
      phone: "03-1234-5678",
      prefecture: "神奈川県",
      city: "横浜市",
      walkingMinutes: Math.floor(Math.random() * 10) + 1,
      onlineConsultation: true,
      badge: ["Web予約可", "土日診療"],
    },
  ];
}

async function main() {
  console.log("Fetching main page...");
  const mainHTML = await fetchHTML(BASE_URL);
  const stations = await parseStations(mainHTML);
  console.log(`Found ${stations.length} stations`);

  const allClinics: any[] = [];
  for (const station of stations) {
    // In a real implementation you would fetch station-specific page and parse clinics.
    // Here we generate mock data.
    const clinics = mockClinicsForStation(station);
    allClinics.push(...clinics);
  }

  const outputPath = join(process.cwd(), "public", "data", "clinics.json");
  writeFileSync(outputPath, JSON.stringify(allClinics, null, 2), "utf-8");
  console.log(`Wrote ${allClinics.length} clinics to ${outputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
