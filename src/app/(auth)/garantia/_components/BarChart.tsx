"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


interface ExampleProps {
    data: {
      name: string;
      pendente: number;
      concluido: number;
    }[];
  }
  
  const Barchart: React.FC<ExampleProps> = ({ data }) => {
    console.log(data)
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/*cor: #8884d8 */}
        <Bar dataKey="pendente" fill="#ff6961" />
        <Bar dataKey="concluido" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart;
