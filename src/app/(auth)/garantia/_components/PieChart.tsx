"use client";

import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import { useRouter } from "next/navigation"; // Importar useRouter para manipulação da URL

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface PieChartProps {
  data: {
    name: string;
    value: number;
  }[];
  consultantName?: string;
  month?: string;
}

const PieChartComponent: React.FC<PieChartProps> = ({
  data,
  consultantName,
  month,
}) => {
  const router = useRouter();

  const handlePieClick = (entry: { name: string }) => {
    const category = entry.name;
    const url = new URL(window.location.href);
    if (category) {
      url.searchParams.set('categoria', category);
      router.push(url.toString());
    }
  };

  const title = consultantName ? consultantName : "GERAL";
  const monthName = formatMonth(month);

  return (
    <div>
      <h2 className="text-center font-bold text-xl mb-4 text-slate-900 font-sans">
        {title} {monthName && `- ${monthName}`}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
            onClick={handlePieClick} // Adiciona o manipulador de clique
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            payload={data.map((item, index) => ({
              value: item.name,
              type: "square",
              id: item.name,
              color: COLORS[index % COLORS.length],
            }))}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const formatMonth = (month?: string) => {
  if (!month) return '';

  const [_, monthNum] = month.split("-");
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  return months[parseInt(monthNum) - 1] || '';
};

export default PieChartComponent;
