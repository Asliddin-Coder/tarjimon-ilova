"use client";

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

export default function TranslationChart({
  labels,
  values,
}: {
  labels: string[];
  values: number[];
}) {
  const data = {
    labels,
    datasets: [
      {
        label: "Tarjimalar soni",
        data: values,
      },
    ],
  };

  return <Bar data={data} />;
}