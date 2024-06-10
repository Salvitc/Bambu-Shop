import React, { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { getOrders } from "../api";

const OrderHistory = () => {
  // cancelled, in progress, delivered
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const getOrderHistory = async () => {
    setLoading(true);
    setOrders(await getOrders());

    setLoading(false);
  };

  useEffect(() => {
    if (!loginState) {
      toast.error("You must be logged in to access this page");
      navigate("/");
    } else {
      getOrderHistory();
    }
  }, []);

  return (
    <>
      <SectionTitle title="Historial de pedidos" path="Perfil | Historial de pedidos" />
      {loading ? <p> Cargando pedidos... </p> :
      <div className="order-history-main max-w-7xl mx-auto mt-10 px-20 max-md:px-10">
        {!orders ? (
          <div className="text-center">
            <h1 className="text-4xl text-accent-content">
              No tienes pedidos aún
            </h1>
            <Link
              to="/shop"
              className="btn bg-green-700 hover:bg-green-900 text-white mt-10"
            >
              Ir a la tienda
            </Link>
          </div>
        ) : (
          orders.map((order) => {
            return (
              <div
                key={nanoid()}
                className="collapse collapse-plus bg-slate-200 mb-2"
              >
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium text-accent-content">
                  Order {order.order_id}
                </div>
                <div className="collapse-content">
                  <div className="overflow-x-auto">
                    <table className="table max-sm:table-xs table-pin-rows table-pin-cols">
                      {/* head */}
                      <thead>
                        <tr className="text-accent-content">
                          <th>Order</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Amount</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.products.map((product, counter) => (
                          <tr className="text-accent-content" key={nanoid()}>
                            <th>{counter + 1}</th>
                            { !product.images ? 
                              <th><img src="https://via.placeholder.com/150" alt="" className="w-10" /></th> :
                              <th><img src={`${product.images[0]}`} alt="" className="w-10" /></th>
                            }
                            <td>{product.name}</td>
                            <td>{product.amount}</td>
                            <td>{(product.price * product.amount)} €</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan="5" className="text-center">
                            <h3 className="text-md text-accent-content">
                              Envío: 5.99 €
                            </h3>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="5" className="text-center">
                            <h3 className="text-xl text-accent-content">
                              - Total pedido: { order.amount } -
                            </h3>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>}
    </>
  );
};

export default OrderHistory;
