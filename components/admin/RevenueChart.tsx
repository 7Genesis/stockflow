"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type ReceitaItem = {
  mes: string;
  receita: number;
};

type RevenueChartProps = {
  data: ReceitaItem[];
};

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [`R$ ${value.toFixed(2)}`, "Receita"]}
          />
          <Line
            type="monotone"
            dataKey="receita"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}