"use client";

import { SectionTitle } from "./SectionTitle"
import { useState } from "react";
import { Jersey_20 } from "next/font/google";

const jerseyFont = Jersey_20({ weight: ["400"], subsets: ["latin"] });

export const ROMAN_NUMBERS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

const useRankingData = (day: number): { nickname: string, indexNumber: number, points: number }[] => {
  return Array.from({ length: 25 }, (_, index) => ({
    nickname: `User ${index + 1 + day * 25}`,
    indexNumber: 210834 + index + day * 25,
    points: index * 100,
  }));
}

export const Ranking = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const rankingData = useRankingData(selectedDay);

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <SectionTitle title="ranking" icon="/trophy.svg" />

      <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-12 gap-4">
        {ROMAN_NUMBERS.map((number, index) => (
          <div key={index} className={`flex flex-col items-center justify-center gap-4 bg-black px-4 py-2 cursor-pointer ${index === selectedDay ? "border-2 border-red-500" : ""}`}
            onClick={() => setSelectedDay(index)}
          >
            <p className={`text-red-500 text-xl ${jerseyFont.className}`}>
              {number}
            </p>
          </div>
        ))}
      </div>

      <div className={`bg-black text-white w-full flex flex-col items-start justify-start gap-0 p-8 ${jerseyFont.className} text-xl`}>
        {rankingData.sort((a, b) => b.points - a.points).map((user, index) => (
          <div key={user.indexNumber * 3} className="flex flex-row items-center justify-start gap-1 w-full">
            <p className={`text-red-500 text-end mr-2 w-5`}>{index + 1}.</p>
            <p>{user.nickname} ({user.indexNumber})</p>
            <p className={`text-red-500 block ml-auto text-end`}>{user.points}</p>
          </div>
        ))}
      </div>
    </div>
  )
}