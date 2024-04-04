import { useContext } from "react";
import { ProductContext, ProductType } from "../Context/ProductStore";
import FilterProduct from "./FilterProduct";

const ProductTable = () => {
  const context = useContext(ProductContext) as ProductType;
  const { products, page, setPage, totalPage, currectPage } = context;
  const onPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const onNextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  return (
    <>
    <FilterProduct />
      <div className="relative  h-[40vh] overflow-auto">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Sold
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                className="bg-white border-b hover:bg-gray-50"
                key={product.id}
              >
                <th
                  scope="row"
                  className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap"
                >
                  {product.id}
                </th>
                <td className="px-2 py-2 overflow-hidden max-w-xs whitespace-nowrap overflow-ellipsis">
                  {product.title}
                </td>
                <td className="px-2 py-2 overflow-hidden max-w-xs whitespace-nowrap overflow-ellipsis">
                  {product.description}
                </td>
                <td className="px-2 py-2 ">${product.price}</td>
                <td className="px-2 py-2 ">{product.category}</td>
                <td className="px-2 py-2 ">{product.sold ? "Yes" : "No"}</td>
                <td className="px-2 py-2 ">
                  <img
                    src={product.image}
                    alt="Product"
                    className="h-20 w-20 object-cover"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center gap-4 mt-4">
        <div>
          <h1 className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
            Page No:{currectPage}
          </h1>
        </div>
        <div className="flex justify-between gap-4 mt-4">
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
            onClick={onPreviousPage}
          >
            Previous
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
            onClick={onNextPage}
          >
            Next
          </button>
        </div>
        <div>
          <h1 className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
            Per Page: 10
          </h1>
        </div>
      </div>
    </>
  );
};

export default ProductTable;
