"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from "recharts";

interface BarChartProps {
  data: {
    inconsistencia: string;
    count: number;
  }[];
  consultantName?: string;
  month?: string;
  category?: string;
}

const BarChartComponent: React.FC<BarChartProps> = ({
  data,
  month,
  consultantName,
  category,
}) => {
  const title = consultantName ? consultantName : "GERAL";
  const monthName = formatMonth(month);
  return (
    <div>
      <h2 className="text-center font-bold text-xl mb-4 text-slate-900 font-sans">
        {title} 
        {category && `- ${category}`}
        {monthName && `- ${monthName}`}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="inconsistencia" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const formatMonth = (month?: string) => {
  if (!month) return "";

  const [_, monthNum] = month.split("-");
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return months[parseInt(monthNum) - 1] || "";
};

export default BarChartComponent;
