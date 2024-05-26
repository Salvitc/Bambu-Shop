import { useDispatch } from "react-redux";
import { updateCart } from "../features/cart/cartSlice";
import { useSelector } from "react-redux";
import { deleteCartItem, getProduct } from "../api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const CartItem = ({ cartItem }) => {
  const { product_id, amount, price } = cartItem;
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const handleDelete = () => {
    const newCartItems = cartItems.filter((item) => item.product_id !== product_id);
    console.log(newCartItems)
    deleteCartItem(product_id).then((response) => {
      if(response){
        dispatch(updateCart(newCartItems));
        toast.success("Producto eliminado del carrito");
      } else {
        toast.error("Error al eliminar el producto del carrito");
      }
    });
  }
  
  useEffect(() => {
    setLoading(true);
    getProduct(product_id).then((response) => {
      setProduct(response);
      setLoading(false);
    });
  }, [cartItems]);

  return (
    <>
    {loading ? <p>Cargando...</p> : 
    <article
      key={product._id}
      className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
    >
      { product.images ?
      <img
        src={`${product.images[0]}`}
        alt={product.name}
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
      /> :
      <img
        src="https://via.placeholder.com/150"
        alt="placeholder"
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
      /> }
      <div className="sm:ml-16 sm:w-48">
        <h3 className="capitalize font-medium text-accent-content">{product.name}</h3>
        <h4 className="mt-2 capitalize text-sm text-accent-content">
          Categoría: { product.category }
        </h4>
      </div>
      <div className="sm:ml-12">
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text text-accent-content">Cantidad</span>
          </label>
          <input
            name="number"
            id="amount"
            className="mt-2 input input-bordered input-sm w-full max-w-xs text-accent-content"
            value={amount}
           onChange={() => {}}
            />
        </div>
        <button
          className="mt-2 link link-warning link-hover text-sm text-accent-content"
          onClick={handleDelete}
        >
          Eliminar
        </button>
      </div>

      <p className="font-medium sm:ml-auto text-accent-content">{ (price * amount).toFixed(2) } €</p>
    </article> }
    </>
  );
};

export default CartItem;
