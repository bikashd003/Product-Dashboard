import Navbar from "./Components/Navbar";
import Product from "./Pages/Product";
import { ProductProvider } from "./Context/ProductStore";

const App = () => {
  return (
    <>
      <ProductProvider>
        <div>
          <Navbar />
          <Product />
        </div>
      </ProductProvider>
    </>
  );
};

export default App;
