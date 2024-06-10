import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct, getWishlist, putCart, putWishlist } from "../api";
import { QuantityInput, SectionTitle, SingleProductReviews } from "../components";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateCart } from "../features/cart/cartSlice";
import { updateWishlist } from "../features/wishlist/wishlistSlice";
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
  const [inWhishlist, setInWhishlist] = useState(false);
  const { wishItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    getWishlist().then((wishlist) => {
      dispatch(updateWishlist(wishlist));
      if (wishItems.includes(id)) {
        setInWhishlist(true);
      }
    });
    getProduct(id).then((product) => {
      setProduct(product);
    });
  }, []);

  const handleWishlist = async () => {
    if (inWhishlist) {
      toast.error("El producto ya está en la lista de deseos");
    } else {
      const res = await putWishlist(product._id);
      if (res.ok) {
        const obj = await res.json();
        dispatch(updateWishlist(obj))
        setInWhishlist(true);
        toast.success("Producto añadido a la lista de deseos")
      } else {
        toast.error("Error al añadir el producto a la lista de deseos")
      }
    }
  }

  const handleCart = () => {
    putCart(product._id, product.price, quantity).then(async (res) => {
      if (res.ok) {
        const cart = await res.json();
        dispatch(updateCart(cart));
        toast.success("Producto añadido al carrito")
      } else {
        toast.error("Error al añadir el producto al carrito")
      }
    });
  }

  return (
    <>
      {!product ? <p>Cargando...</p> : <div>
        <SectionTitle title="Producto" path="Inicio | Tienda | Producto" />
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-4">
              {product.images ?
                <img
                  className="rounded-lg"
                  src={`${product.images[0]}`}
                  alt="product"
                /> :
                <img
                  className="rounded-lg"
                  src="https://via.placeholder.com/350"
                  alt="product"
                />
              }
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
                <div className="flex items-center gap-4">
                  <button className="btn bg-red-400 hover:bg-red-200" onClick={handleWishlist}>
                    {inWhishlist ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <div className="flex flex-col">
                    <QuantityInput quantity={quantity} setQuantity={setQuantity} />
                    <button className="btn btn-accent" onClick={handleCart}>Añadir al carrito</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}

export default SingleProduct;
