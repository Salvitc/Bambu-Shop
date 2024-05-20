import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api";
import { SectionTitle, SingleProductReviews } from "../components";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState([
    "empty star",
    "empty star",
    "empty star",
    "empty star",
    "empty star",
  ]);

  useEffect(() => {
    getProduct(id).then((product) => {
      setProduct(product);
    });
  }, [id]);

  return (
    <>
      <SectionTitle title="Producto" path="Inicio | Tienda | Producto" />
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <img
              className="rounded-lg"
              src={`https://${product.imageUrl}`}
              alt="product"
            />
          </div>
          <div className="w-full md:w-1/2 px-5 py-10">
            <h2 className="text-4xl font-semibold text-accent-content">
              {product.name}
            </h2>
            <p className="text-xl text-accent-content mt-5">
              {product.description}
            </p>
            <div className="flex items-center justify-between mt-5">
              <span className="text-3xl font-bold text-accent-content">
                {product.price} €
              </span>
              <button className="btn btn-accent">Añadir al carrito</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
