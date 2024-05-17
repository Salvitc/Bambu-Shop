import React, { useState } from "react";
import FormInput from "./FormInput";
import { Form, Link } from "react-router-dom";
import FormRange from "./FormRange";
import FormSelect from "./FormSelect";
import FormDatePicker from "./FormDatePicker";
import FormCheckbox from "./FormCheckbox";

const Filters = () => {
  const [selectCategoryList, setSelectCategoryList] = useState([
    "todos",
    "flores",
    "jardinería"
  ]);

  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
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
        price={2000}
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
      <Link to="/shop?page=1" className="btn btn-primary btn-sm">
        reset
      </Link>
    </Form>
  );
};

export default Filters;
