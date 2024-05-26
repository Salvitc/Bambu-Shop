import React, { useEffect } from "react";
import { getProducts } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../features/product/productSlice";
import {
  Filters,
  ProductElement,
  SectionTitle,
} from "../components";
import "../styles/Shop.css";

const Shop = () => {
  const productsState = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [reset, setReset] = React.useState(false);

  useEffect(() => {
    getProducts().then((products) => {
      dispatch(setProducts(products));
    });
  }, [dispatch, reset]);

  return (
    <>
      <SectionTitle title="La tienda" path="Inicio | Tienda" />
      <div className="max-w-7xl mx-auto mt-5">
        <Filters 
          setReset={setReset}
          reset={reset}
        />
        <div className="grid grid-cols-4 px-2 gap-y-4 gap-x-2 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 shop-products-grid">
          {productsState.products.map((product) => {
            const image = product.images ? product.images[0] : "https://via.placeholder.com/350";
            return (<ProductElement
              key={product._id}
              id={product._id}
              title={product.name}
              image={image}
              rating={product.rating}
              price={product.price}
            />)
          })}
        </div>
      </div>
    </>
  );
};

export default Shop;
