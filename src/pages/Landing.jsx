import React from "react";
import "../styles/Landing.css";
import { Hero, ProductElement } from "../components";
import { useEffect, useState } from "react";
import { getProducts } from "../api";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../features/product/productSlice";

const Landing = () => {
  const productsState = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts().then((products) => {
      if (products === null) {
        dispatch(setProducts(new Array()));
      } else {
        dispatch(setProducts(products));
      }
    });
  }, [dispatch]);

  return (
    <main>
      <Hero />
      <div className="selected-products">
        <h2 className="text-6xl text-center my-12 max-md:text-4xl text-accent-content">
          Productos seleccionados
        </h2>
        {!productsState ? <p>Cargando productos...</p> :
          <div className="selected-products-grid max-w-7xl mx-auto">
            {productsState.products.map((product) => {
              const image = product.images ? product.images[0] : "https://via.placeholder.com/350";
              return (
                <ProductElement
                  key={product._id}
                  id={product._id}
                  title={product.name}
                  image={image}
                  rating={product.rating}
                  price={product.price}
                />
              )
            })}
          </div>}
      </div>
    </main>
  );
};

export default Landing;
