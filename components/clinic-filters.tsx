"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function ClinicFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (name: string, value: string) => {
    router.push("?" + createQueryString(name, value), { scroll: false });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        条件で絞り込む
      </h3>

      <div className="flex flex-wrap gap-4">
        {/* 徒歩分数 */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">駅からの距離</label>
          <select
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
            value={searchParams.get("walking") || ""}
            onChange={(e) => handleFilterChange("walking", e.target.value)}
          >
            <option value="">指定なし</option>
            <option value="5">徒歩5分以内</option>
            <option value="10">徒歩10分以内</option>
            <option value="15">徒歩15分以内</option>
          </select>
        </div>

        {/* 診療科目 - 現状は内科・産婦人科が主だが、将来的に拡張可能 */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">診療科目</label>
          <select
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
            value={searchParams.get("specialty") || ""}
            onChange={(e) => handleFilterChange("specialty", e.target.value)}
          >
            <option value="">指定なし</option>
            <option value="産婦人科">産婦人科</option>
            <option value="内科">内科</option>
            <option value="婦人科">婦人科</option>
          </select>
        </div>

        {/* オンライン診療 */}
        <div className="flex flex-col gap-1 justify-end">
          <label className="flex items-center gap-2 cursor-pointer px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors bg-white">
            <input
              type="checkbox"
              className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500 border-gray-300"
              checked={searchParams.get("online") === "true"}
              onChange={(e) => handleFilterChange("online", e.target.checked ? "true" : "")}
            />
            <span className="text-sm text-gray-700">オンライン診療対応</span>
          </label>
        </div>
      </div>
    </div>
  );
}
