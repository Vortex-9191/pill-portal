// scripts/fetchClinics.js

const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { writeFileSync } = require('fs');
const { join } = require('path');

// Target URL – main page that lists stations/areas
const BASE_URL = "https://yokohama-ekimae.net/pillarea/";

// Helper to fetch HTML
async function fetchHTML(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

// Scrape details for a single station
async function scrapeStationPage(station) {
  const url = `https://yokohama-ekimae.net/pillarea/area/${station.prefecture}/${station.slug}`; // Construct URL
  // Note: The slug in the URL might be different from the one we generated.
  // The station.slug we have is like "pref_13_station_0e60d65e" which seems to match the URL pattern "area/pref_XX/pref_XX_station_XXXX"
  // Let's verify the URL construction.
  // In parseStations, we extracted slug from "https://yokohama-ekimae.net/pillarea/area/pref_13/pref_13_station_707ba17c"
  // So the slug IS "pref_13_station_707ba17c".
  // The URL structure is `.../area/{prefecture_id}/{slug}`.
  // But we only have "東京都" as prefecture name, not "pref_13".
  // We need to extract the full path or the prefecture ID from the original link.

  // Let's adjust parseStations to store the full relative link or the prefecture ID.
  // For now, let's assume we can fetch the URL if we stored it.
  // But wait, we didn't store the full URL in the previous step.
  // We need to fix parseStations first to store the full URL or enough info to reconstruct it.

  console.log(`Fetching ${url}...`);
  // Placeholder return for now until we fix the URL issue
  return [];
}

// Very simple parser – extracts station links from the "主要エリア・駅から探す" section
async function parseStations(html) {
  const $ = cheerio.load(html);
  const stations = [];

  // Iterate over each prefecture group in the major areas section
  $(".major-areas-wrapper .major-area-group").each((_i, group) => {
    const prefName = $(group).find(".major-area-title").text().trim();

    // Find all area links (both cities and stations)
    $(group).find(".area-link").each((_j, link) => {
      const href = $(link).attr("href") || "";
      // Remove the count span to get just the name
      const name = $(link).clone().children().remove().end().text().trim();

      // Expect href like "https://yokohama-ekimae.net/pillarea/area/pref_13/pref_13_station_707ba17c"
      // We want the last part as the slug
      const slugMatch = href.match(/\/([^/]+)\/?$/);
      const slug = slugMatch ? slugMatch[1] : null;

      if (slug && name) {
        stations.push({
          name,
          slug,
          prefecture: prefName,
          url: href // Store the full URL
        });
      }
    });
  });

  return stations;
}

// Mock clinic extraction – in real case you would fetch each station page and parse clinic cards
function mockClinicsForStation(station) {
  // Infer city from station name if it ends with 区 or 市, otherwise use a placeholder or the station name itself
  let city = station.name;
  if (station.name.endsWith("駅")) {
    city = station.prefecture; // Fallback for stations if we don't know the city
  }

  return [
    {
      id: `${station.slug}-c1`,
      name: `${station.name}クリニック`,
      slug: `${station.slug}-clinic`,
      stationSlug: station.slug, // Add this
      address: `${station.name}駅周辺 1-1-1`,
      station: station.name,
      specialties: ["内科", "産婦人科"],
      phone: "03-1234-5678",
      prefecture: station.prefecture,
      city: city,
      walkingMinutes: Math.floor(Math.random() * 10) + 1,
      onlineConsultation: true,
      badge: ["Web予約可", "土日診療"],
    },
  ];
}

async function scrapeClinicsForStation(station) {
  if (!station.url) return [];

  try {
    const html = await fetchHTML(station.url);
    if (!html) return [];

    const $ = cheerio.load(html);
    const clinics = [];

    $('article.aga-clinic-card, article.pill-clinic-card').each((i, el) => {
      const $el = $(el);
      const rawName = $el.find('.clinic-main-title').text().trim();
      // Remove leading numbers like "3. " and newlines
      const name = rawName.replace(/^\d+\.\s*/, "").replace(/\s+/g, " ").trim();

      const address = $el.find('.clinic-access-section .address').text().replace('住所：', '').trim();
      const access = $el.find('.clinic-access-section .station').text().replace('最寄駅：', '').trim();
      const phone = $el.find('.phone-link').text().trim();

      // Check for online consultation availability
      // There is a table row for "オンライン診療" with a checkmark or cross
      const onlineRow = $el.find('th:contains("オンライン診療")').parent();
      const isOnline = onlineRow.find('.available-mark').length > 0 || onlineRow.find('.status-yes').length > 0;

      if (name) {
        clinics.push({
          id: `${station.slug}-c${clinics.length + 1}`,
          name,
          slug: `${station.slug}-clinic-${clinics.length + 1}`,
          stationSlug: station.slug,
          address: address || `${station.name}駅周辺`,
          station: station.name,
          specialties: ["内科", "産婦人科"], // Default
          phone: phone || null,
          prefecture: station.prefecture,
          city: station.prefecture, // Placeholder
          walkingMinutes: 5, // Placeholder
          onlineConsultation: isOnline,
          badge: isOnline ? ["Web予約可", "オンライン診療"] : ["Web予約可"],
          access: access // Store raw access string for now
        });
      }
    });

    return clinics;
  } catch (error) {
    console.error(`Error scraping station ${station.name}:`, error);
    return [];
  }
}

async function main() {
  console.log("Fetching main page...");
  const html = await fetchHTML(BASE_URL);
  if (!html) {
    console.error("Failed to fetch main page");
    return;
  }

  const stations = await parseStations(html);
  console.log(`Found ${stations.length} stations`);

  const allClinics = [];
  // Scrape all stations
  for (const [index, station] of stations.entries()) {
    console.log(`[${index + 1}/${stations.length}] Scraping clinics for ${station.name}...`);
    const clinics = await scrapeClinicsForStation(station);
    console.log(`Found ${clinics.length} clinics for ${station.name}`);
    allClinics.push(...clinics);

    // Be polite - wait 5 seconds between requests to avoid rate limiting
    await new Promise(r => setTimeout(r, 5000));
  }

  // Write to file
  const outputPath = join(process.cwd(), "public", "data", "clinics.json");
  writeFileSync(outputPath, JSON.stringify(allClinics, null, 2));
  console.log(`Wrote ${allClinics.length} clinics to ${outputPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
