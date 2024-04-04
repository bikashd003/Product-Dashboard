import BarChart from "../Components/BarChart";
import PieChart from "../Components/PieChart";
import ProductTable from "../Components/ProductTable";
import Statistics from "../Components/Statistics";

const Product = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-12 md:col-span-12 xl:col-span-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Transactions</h2>
            <ProductTable />
          </div>
        </div>
        <div className="col-span-12 md:col-span-12 xl:col-span-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Statistics</h2>
         
            <PieChart />
          </div>
        </div>
        <div className="col-span-12 md:col-span-12 xl:col-span-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
            <Statistics />
          </div>
        </div>
        <div className="col-span-12 md:col-span-12 xl:col-span-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Price Range</h2>
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;