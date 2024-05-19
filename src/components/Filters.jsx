import React, { useState } from "react";
import { getProducts } from "../api";
import FormInput from "./FormInput";
import { Form, Link } from "react-router-dom";
import FormRange from "./FormRange";
import FormSelect from "./FormSelect";
import FormCheckbox from "./FormCheckbox";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../features/product/productSlice";
const Filters = ({ setReset, reset }) => {
  const productsState = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const selectCategoryList = [
    "todos",
    "flores",
    "jardinería"
  ];

  const handleReset = () => {
    setReset(!reset);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let productsList = await getProducts(); 
    
    if (event.target.category.value !== "todos") {
      productsList = productsList.filter(
        (product) => product.category === event.target.category.value
      );
    }

    productsList = productsList.filter(
      (product) => product.price <= event.target.price.value
    );
    
    if (event.target.stock.checked) {
      productsList = productsList.filter(
        (product) => product.in_stock === event.target.stock.checked
      );
    }

    if(event.target.search.value !== ""){
      productsList = productsList.filter(
        (product) => product.name.toLowerCase().includes(event.target.search.value.toLowerCase())
      );
    }

    switch (event.target.order.value) {
      case "asc":
        productsList = productsList.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
      case "desc":
        productsList = productsList.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;
      case "price high":
        productsList = productsList.sort((a, b) => b.price - a.price);
        break;
      case "price low":
        productsList = productsList.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    dispatch(setProducts(productsList));
  }

  return (
    <Form onSubmit={handleSubmit} className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      <FormInput
        type="search"
        label="Buscar producto"
        name="search"
        size="input-sm"
        defaultValue=""
      />
      <FormSelect
        label="Seleccionar categoría"
        name="category"
        list={selectCategoryList}
        size="select-sm"
        defaultValue="all"
      />
      <FormSelect
        label="Ordenar por"
        name="order"
        list={["asc", "desc", "price high", "price low"]}
        size="select-sm"
        defaultValue="a-z"
      />
      <FormRange
        name="price"
        label="select price"
        size="range-sm"
        price={40}
      />
      <FormCheckbox
        label="Solo productos en stock"
        name="stock"
        defaultValue="false"
      />
      <button
        type="submit"
        className="btn bg-blue-600 hover:bg-blue-500 text-white btn-sm"
      >
        Buscar
      </button>
      <button onClick={handleReset} className="btn btn-primary btn-sm">
        reset
      </button>
    </Form>
  );
};

export default Filters;
