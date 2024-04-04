import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../Helper/Api";
interface statistics {
  totalSaleAmount: number;
  totalSoldItems: number;
  totalNotSoldItems: number;
}
const Statistics = () => {
  const [productStatistics, setProductStatistics] = useState<statistics>({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });
  const [month, setMonth] = useState("3");

  const fetchProductStatistics = async () => {
    await axios
      .get(`${API}/api/get-statistics`, { params: { month: month } })
      .then((res) => {
        setProductStatistics(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProductStatistics();
  }, [month]);

  return (
    <div className="p-6 h-[40vh]">
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="month" className="mr-2 font-medium">
            Choose a month:
          </label>
          <select
            id="month"
            className="border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
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
      </div>
      <table className="min-w-full text-left text-sm whitespace-nowrap bg-yellow-400">
        <tr className="border dark:border-neutral-600">
          <th
            scope="row"
            className="px-6 py-3 border-x dark:border-neutral-600"
          >
            Total sale
          </th>
          <td className="px-6 py-3 border-x dark:border-neutral-600">
            {productStatistics.totalSaleAmount || 0}
          </td>
        </tr>
        <tr className="border dark:border-neutral-600">
          <th
            scope="row"
            className="px-6 py-3 border-x dark:border-neutral-600"
          >
            Total sold item
          </th>
          <td className="px-6 py-3 border-x dark:border-neutral-600">
            {productStatistics.totalSoldItems || 0}
          </td>
        </tr>
        <tr className="border dark:border-neutral-600">
          <th
            scope="row"
            className="px-6 py-3 border-x dark:border-neutral-600"
          >
            Total not sold item
          </th>
          <td className="px-6 py-3 border-x dark:border-neutral-600">
            {productStatistics.totalNotSoldItems || 0}
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Statistics;
