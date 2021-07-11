import React from 'react';
import {
  AreaChart,
  BarChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function ChartArea({data}: { data: { date: string, quantity: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          left: 60,
        }}
        width={1000}
        height={500}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="date"/>
        <YAxis/>
        <Tooltip/>
        <Area type="monotone" dataKey="quantity" stroke="#717ec7" fill="#b8c2ff"/>
      </AreaChart>
    </ResponsiveContainer>
  )
}

function ChartBars({data}: { data: { date: string, quantity: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          left: 40,
          right: 30,
        }}
        width={1000}
        height={500}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="date"/>
        <YAxis/>
        <Tooltip/>
        <Bar dataKey="quantity" fill="#8884d8"/>
      </BarChart>
    </ResponsiveContainer>
  );
}

const StatisticsChart = {ChartArea, ChartBars};

export default StatisticsChart;
