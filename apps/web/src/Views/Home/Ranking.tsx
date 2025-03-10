"use client";

import { SectionTitle } from "./SectionTitle"
import { useEffect, useState } from "react";
import { Jersey_20 } from "next/font/google";
import { useGetRanking } from "@/services/api";
import { Faculty, type Ranking as RankingType } from "@repo/types";
import { Select } from "@repo/ui";

const jerseyFont = Jersey_20({ weight: ["400"], subsets: ["latin"] });

export const ROMAN_NUMBERS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export function Ranking(): React.JSX.Element {
  // const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [rankingData, setRankingData] = useState<RankingType | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const { data, error, isLoading } = useGetRanking(`/ranking?${selectedYear ? `year=${selectedYear}` : ""}${selectedFaculty ? `&faculty=${selectedFaculty}` : ""}`);

  useEffect(() => {
    if (!data) {
      return;
    }
    setRankingData(data.general);
    // if (!selectedTask) {
    //   setRankingData(data.general);
    // } else {
    //   setRankingData(data.perTask[selectedTask]);
    // }
  }, [data])

  // const handleSelectDay = (index: number): void => {
  //   if (selectedTask === index) {
  //     setSelectedTask(null);
  //     return;
  //   }
  //   setSelectedTask(index);
  // }

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <SectionTitle title="ranking" icon="/trophy.svg" />

      {/* <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-12 gap-4">
        {ROMAN_NUMBERS.map((number, index) => (
          <button key={number} type="button" className={`flex flex-col items-center justify-center gap-4 bg-black px-4 py-2 cursor-pointer border-2  ${index === selectedTask ? "border-red-500" : "border-transparent"}`}
            onClick={() => { handleSelectDay(index) }}
          >
            <p className={`text-red-500 text-xl ${jerseyFont.className}`}>
              {number}
            </p>
          </button>
        ))}
      </div> */}
      <div className="w-full flex md:!flex-row flex-col items-center justify-start gap-4">
        <div className="flex flex-col items-start justify-start w-full">
          <label htmlFor="year" className={`text-red-500 ${jerseyFont.className} text-xl`}>Rok akademicki:</label>
          <Select className={`!text-red-500 !border-red-500 !border-[2px] text-xl ${jerseyFont.className}`} id="year" onChange={(e) => setSelectedYear(e.target.value === "all" ? null : Number(e.target.value))} value={selectedYear || "all"}>
            <option value="all">Wszystkie</option>
            <option value="1">I</option>
            <option value="2">II</option>
            <option value="3">III</option>
            <option value="4">IV</option>
            <option value="5">V</option>
          </Select>
        </div>
        <div className="flex flex-col items-start justify-start w-full">
          <label htmlFor="faculty" className={`text-red-500 ${jerseyFont.className} text-xl`}>Kierunek:</label>
          <Select id="faculty" className={`!text-red-500 !border-red-500 !border-[2px] text-xl ${jerseyFont.className}`} onChange={(e) => setSelectedFaculty(e.target.value === "all" ? null : e.target.value as Faculty)} value={selectedFaculty || "all"}>
            <option value="all">Wszystkie</option>
            <option value={Faculty.INF}>Informatyka</option>
            <option value={Faculty.INFEKO}>Informatyka i Ekonometria</option>
          </Select>

        </div>
      </div>

      <div className={`bg-black text-white w-full flex flex-col items-start justify-start gap-0 p-8 ${jerseyFont.className} text-xl`}>
        {
          isLoading ? <p className="w-full text-center">Ładowanie...</p> : null
        }
        {
          error ? <p className="w-full text-center">Error: {error.message}</p> : null
        }
        {
          (!rankingData || rankingData.length === 0) && !error && !isLoading ? <p className="w-full text-center">Brak danych</p> : null
        }
        {
          rankingData ?
            rankingData.sort((a, b) => b.points - a.points).map((user, index) => (
              <div key={user.indexNumber * 3} className="flex flex-row items-center justify-start gap-1 w-full">
                <p className="text-red-500 text-end mr-2 w-5">{index + 1}.</p>
                <p>{user.firstName} {user.lastName} ({user.indexNumber})</p>
                <p className="text-red-500 block ml-auto text-end">{user.points}</p>
              </div>
            )) : null
        }
      </div>
    </div>
  )
}