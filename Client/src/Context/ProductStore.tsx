import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { API } from "../Helper/Api";
interface Product {
  _id: string;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  sold: boolean;
}
export interface ProductType {
  products: Product[];
  setProducts: (value: Product[]) => void;
  page:number;
  setPage:(value:number)=>void;
  totalPage:number;
  setTotalPage:(value:number)=>void;
  currectPage:number;
  setCurrentPage:(value:number)=>void;
  search:string;
  setSearch:(value:string)=>void;
  month:string;
  setMonth:(value:string)=>void;
}

const ProductContext = createContext<ProductType | undefined>(undefined);

const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPage,setTotalPage]=useState(0)
  const[currectPage,setCurrentPage]=useState(1)
  const[search,setSearch]=useState("")
  const[month,setMonth]=useState("")
  const[page,setPage]=useState(1)

  const fetchProduct = async () => {
    await axios.get(`${API}/api/get-transactions`,{
        params: { page: page,search:search,month:month }})
      .then((res: any) => {
        setProducts(res.data.transactions);
        setTotalPage(res.data.totalPages)
        setCurrentPage(res.data.currentPage)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchProduct();
  }, [page,search,month]);


  return (
    <ProductContext.Provider value={{currectPage,setCurrentPage,
     products, setProducts,page,setPage,totalPage,
     setTotalPage,search,setSearch,month,setMonth}}>
      {children}
    </ProductContext.Provider>
  );
};
export { ProductProvider, ProductContext };
