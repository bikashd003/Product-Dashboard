import { useContext } from "react";
import { ProductContext, ProductType } from "../Context/ProductStore";

const FilterProduct = () => {
  const context = useContext(ProductContext) as ProductType;
  const { search, setSearch, month, setMonth } = context;

  return (
    <div className="flex justify-between items-center border-b-2 border-gray-200 pb-4 mb-4">
      <div>
        <input
          type="text"
          value={search}
          placeholder="Search"
          className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
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
    </div>
  );
};

export default FilterProduct;
