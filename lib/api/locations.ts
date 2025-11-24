import { promises as fs } from 'fs';
import path from 'path';

// Types
export interface Region {
  name: string;
  prefectures: string[];
}

export const REGIONS: Region[] = [
  { name: '北海道・東北', prefectures: ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'] },
  { name: '関東', prefectures: ['東京都', '神奈川県', '埼玉県', '千葉県', '茨城県', '栃木県', '群馬県'] },
  { name: '中部', prefectures: ['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県'] },
  { name: '近畿', prefectures: ['三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'] },
  { name: '中国・四国', prefectures: ['鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県'] },
  { name: '九州・沖縄', prefectures: ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'] },
];

export const PREFECTURE_SLUGS: Record<string, string> = {
  '北海道': 'hokkaido', '青森県': 'aomori', '岩手県': 'iwate', '宮城県': 'miyagi', '秋田県': 'akita', '山形県': 'yamagata', '福島県': 'fukushima',
  '茨城県': 'ibaraki', '栃木県': 'tochigi', '群馬県': 'gunma', '埼玉県': 'saitama', '千葉県': 'chiba', '東京都': 'tokyo', '神奈川県': 'kanagawa',
  '新潟県': 'niigata', '富山県': 'toyama', '石川県': 'ishikawa', '福井県': 'fukui', '山梨県': 'yamanashi', '長野県': 'nagano', '岐阜県': 'gifu', '静岡県': 'shizuoka', '愛知県': 'aichi',
  '三重県': 'mie', '滋賀県': 'shiga', '京都府': 'kyoto', '大阪府': 'osaka', '兵庫県': 'hyogo', '奈良県': 'nara', '和歌山県': 'wakayama',
  '鳥取県': 'tottori', '島根県': 'shimane', '岡山県': 'okayama', '広島県': 'hiroshima', '山口県': 'yamaguchi',
  '徳島県': 'tokushima', '香川県': 'kagawa', '愛媛県': 'ehime', '高知県': 'kochi',
  '福岡県': 'fukuoka', '佐賀県': 'saga', '長崎県': 'nagasaki', '熊本県': 'kumamoto', '大分県': 'oita', '宮崎県': 'miyazaki', '鹿児島県': 'kagoshima', '沖縄県': 'okinawa'
};

export async function getClinicsData() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'clinics.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading clinics data:', error);
    return [];
  }
}

export async function getClinicsCountByPrefecture() {
  const clinics = await getClinicsData();
  const counts: Record<string, number> = {};

  clinics.forEach((clinic: any) => {
    const pref = clinic.prefecture;
    if (pref) {
      counts[pref] = (counts[pref] || 0) + 1;
    }
  });

  return counts;
}

export async function getAllStations() {
  const clinics = await getClinicsData();
  const stationMap = new Map<string, { prefectures: Set<string>; count: number }>();

  clinics.forEach((clinic: any) => {
    if (!clinic.station) return;

    // In the JSON, station is a single string usually, but let's handle if it's comma separated just in case, 
    // though our scraper puts single station name.
    // The scraper puts "station": "Station Name".
    const stationName = clinic.station;

    if (stationName) {
      const existing = stationMap.get(stationName);
      if (existing) {
        existing.count++;
        existing.prefectures.add(clinic.prefecture);
      } else {
        stationMap.set(stationName, {
          prefectures: new Set([clinic.prefecture]),
          count: 1
        });
      }
    }
  });

  return Array.from(stationMap.entries())
    .map(([name, value]) => ({
      name,
      prefecture: Array.from(value.prefectures)[0],
      count: value.count,
      slug: name // Using name as slug for now
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'ja'));
}
