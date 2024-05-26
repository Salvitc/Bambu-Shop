import React, { useEffect } from "react";
import { SectionTitle } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateCart } from "../features/cart/cartSlice";
import { clearCart, currentCartToOrder } from "../api";
const ThankYou = () => {

  const { cartItems } = useSelector((state) => state.cart);
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saveToOrderHistory = async () => {
    const response = await currentCartToOrder();

    if (response.ok) {
      const response = await clearCart();
      if (response.ok){
        dispatch(updateCart([]));
      } else {
        toast.error("Error al vaciar el carrito");
      }
    } else {
      toast.error("Error al guardar el pedido en el historial");
    }
  };


  useEffect(() => {
    if (!loginState) {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }

    if (cartItems.length > 0) {
      saveToOrderHistory().then(() => {
        toast.success("Pedido realizado correctamente");
      });
    }
  }, []);

  return (
    <>
      <div>

      <SectionTitle title="Gracias" path="Inicio | Carrito | Gracias" />
      <div className="thankyou-content text-center text-accent-content px-10 max-w-7xl mx-auto">
        <h2 className="text-6xl max-sm:text-4xl">
          ¡Gracias por tu compra!
        </h2>

        <h3 className="text-2xl mt-10 max-sm:text-xl">
          Tu pedido ha sido procesado y se enviará pronto.
        </h3>
        <h3 className="text-2xl mt-5 max-sm:text-xl">
          Aquí hay algunas cosas que puedes hacer:
        </h3>
        <ul className="text-xl mt-5 text-blue-500 max-sm:text-lg">
          <li className="hover:text-blue-600 cursor-pointer">
            <Link to="/order-history">&rarr; Ver historial de pedidos &larr;</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <Link to="/">&rarr; Vuelve al inicio &larr;</Link>
          </li>
        </ul>
        <h4 className="text-xl max-sm:text-lg">
          ¡Gracias por elegirnos! 🎉
        </h4>
      </div>
      </div>
    </>
  );
};

export default ThankYou;
