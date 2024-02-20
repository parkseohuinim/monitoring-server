'use client'
import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false
    },

  },
};

interface MonitorProps {
  takeExam: number;
  excellentTest: number;
  mentorProgram: number;
  fieldTraining: number;
  copyrightRegistration: number;
  preliminaryCurriculum: number;
  regularCurriculum: number;
}
export default function Monitor({
  takeExam = 1,
  excellentTest = 1,
  mentorProgram = 1,
  fieldTraining = 2,
  copyrightRegistration = 2,
  preliminaryCurriculum = 5,
  regularCurriculum = 6
}: MonitorProps) {
  const labels = useMemo(() => {
    return [
      "치킨",
      "피자",
      "햄버거",
      "크림 파스타",
      "토마토 파스타",
      "참치 회",
      "든든한 국밥",
    ]
  }, []);
  const data = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: "점수",
          data: [takeExam, excellentTest, mentorProgram, fieldTraining, copyrightRegistration, preliminaryCurriculum, regularCurriculum],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    }
  }, []);
  return (
    <div className="">
      <Bar
        options={options}
        data={data} />
    </div>

  );
}