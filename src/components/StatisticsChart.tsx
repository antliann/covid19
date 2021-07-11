import React from "react";
import {
  AreaChart,
  BarChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

function ChartArea({data}: { data: { date: string, quantity: string }[] }) {
  return (
    <AreaChart
      width={500}
      height={400}
      data={data}
      margin={{
        left: 30,
      }}
    >
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="date"/>
      <YAxis/>
      <Tooltip/>
      <Area type="monotone" dataKey="quantity" stroke="#8884d8" fill="#8884d8"/>
    </AreaChart>
  )
}

function ChartBars({data}: { data: { date: string, quantity: string }[] }) {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        left: 30,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="quantity" fill="#8884d8" />
    </BarChart>
  );
}

const StatisticsChart = {ChartArea, ChartBars};

export default StatisticsChart;
