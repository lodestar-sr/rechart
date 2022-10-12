import {useMemo} from "react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import "./style.css";

export const Chart = ({
  data,
  onSelectDate,
}) => {
  const chartData = useMemo(() => {
    const dates = Object.keys(data).sort((a, b) => b.localeCompare(a));
    return dates.map((date) => ({
      date,
      ...data[date],
    }));
  }, [data]);

  return (
    <div className="chart-container">
      <div className="title">
        Twitter Sentiment Category Timeline
        <i className="fab fa-twitter" />
      </div>

      <BarChart width={800} height={400} data={chartData} onClick={(e) => onSelectDate(e.activeLabel)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="POSITIVE" fill="#8884d8" />
        <Bar dataKey="NEGATIVE" fill="#82ca9d" />
        <Bar dataKey="NEUTRAL" fill="#82299d" />
      </BarChart>
    </div>
  );
};
