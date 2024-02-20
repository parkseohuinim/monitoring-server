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
  chicken: number;
  pizza: number;
  hamburger: number;
  cream: number;
  tomato: number;
  maguro: number;
  gookbab: number;
}
export default function Monitor({
  chicken = 1,
  pizza = 1,
  hamburger = 1,
  cream = 2,
  tomato = 2,
  maguro = 5,
  gookbab = 6
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
          data: [chicken, pizza, hamburger, cream, tomato, maguro, gookbab],
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