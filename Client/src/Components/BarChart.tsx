import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { API } from "../Helper/Api";
import axios from "axios";

const BarChart = () => {
  const [labels, setLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [month, setMonth] = useState("3");
  const fetchData = async () => {
    await axios
      .get(`${API}/api/bar-chart`,{params:{month:month}})
      .then((res) => {
        setLabels(res.data.map((item: any) => item.priceRange));
        setChartData(res.data.map((item: any) => item.count));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  },[month]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "count",
        data: chartData,
        backgroundColor: [
          "rgba(54, 162, 235, 2)",
          "rgba(255, 206, 86, 2)",
          "rgba(255, 20, 86, 2)",
          "rgba(20, 21, 50, 2)",
          "rgba(100, 210, 5, 2)",
        ],
      },
    ],
  };
  return (
    <>
     <div className="flex flex-col items-center h-[40vh]">
     <div>
        <label htmlFor="month" className="mr-2">Choose a month:</label>
        <select
          id="month"
          className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">Select Month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      <Chart type="bar" data={data} />
    </div>
    </>
  );
};

export default BarChart;