import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";
import logo from "../assets/bambu-logo.png";
import "../styles/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { updateWishlist } from "../features/wishlist/wishlistSlice";
import { updateCart } from "../features/cart/cartSlice";
import { getUserData, getLoggedIn, logout } from "../api";
import { loginUser, logoutUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const logged = useSelector((state) => state.auth.isLoggedIn);
  const { amount, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCartWish = async () => {
    const user = await getUserData()
    if (user) {
      dispatch(updateWishlist(user.wishlist));
      dispatch(updateCart(user.cart));
    }
  };

  const handleLogout = async () => {
    logout().then((response) => {
      if (response) {
        dispatch(logoutUser());
        navigate("/login");
      }
    });
  }

  useEffect(() => {
    getLoggedIn()
      .then((response) => {
        if (response) {
          if (!logged) {
            dispatch(loginUser());
          }
        }
        else {
          if (logged) {
            dispatch(logoutUser());
          }
        }
      })
  }, []);

  useEffect(() => {
    fetchCartWish();
  }, [amount, total]);

  return (
    <>
      <div className="navbar bg-slate-50 max-w-7xl mx-auto">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-2xl font-black text-accent-content"
          >
            <img src={logo} alt="Bambú Shop" className="w-20" />
            Bambú Shop
          </Link>
        </div>
        <div className="flex-none">
          <Link
            to="/wishlist"
            className="btn btn-ghost btn-circle text-accent-content"
          >
            <FaHeart className="text-xl" />
          </Link>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-green-700 bg-opacity-70 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-gray-200 text-lg  text-accent-content">
                  {amount} Items
                </span>
                <span className="text-info text-white text-accent-content">
                  Subtotal: {total.toFixed(2)} €
                </span>
                <div className="card-actions">
                  <Link
                    to="/cart"
                    className="btn bg-green-700 btn-block text-white hover:bg-green-900 text-slate-content"
                  >
                    Ver Carrito
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {logged && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://xsgames.co/randomusers/avatar.php?g=male" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-green-700 bg-opacity-70 rounded-box w-52"
              >
                <li>
                  <Link
                    to="/user-profile"
                    className="justify-between text-accent-content"
                  >
                    Perfil
                  </Link>
                </li>
                <li>
                  <Link to="/order-history" className="text-accent-content">
                    Historial de pedidos
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLogout} className="text-accent-content">
                    Cerrar Sesión
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="navbar-bottom-menu bg-green-700 bg-opacity-100">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="btn drawer-button">
              <HiMiniBars3BottomLeft className="text-4xl" />
            </label>
          </div>
          <div className="drawer-side z-10">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <ul className="menu p-4 w-80 min-h-full bg-green-800 bg-opacity-100 text-white mt-4">
              <label htmlFor="my-drawer" className="btn drawer-button">
                <FaWindowClose className="text-3xl ml-auto" />
              </label>
              <li className="text-xl">
                <NavLink className="text-accent-content" to="/">
                  Inicio
                </NavLink>
              </li>
              <li className="text-xl">
                <NavLink className="text-accent-content" to="/shop">
                  Tienda
                </NavLink>
              </li>
              <li className="text-xl">
                <NavLink className="text-accent-content" to="/about-us">
                  Sobre Nosotros
                </NavLink>
              </li>
              <li className="text-xl">
                <NavLink className="text-accent-content" to="/contact">
                  Contacto
                </NavLink>
              </li>
              {!logged && (
                <>
                  <li className="text-xl">
                    <NavLink className="text-accent-content" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="text-xl">
                    <NavLink className="text-accent-content" to="/register">
                      Registro
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="container text-2xl navlinks-container">
          <NavLink className="text-accent-content" to="/">
            Inicio
          </NavLink>
          <NavLink className="text-accent-content" to="/shop">
            Tienda
          </NavLink>
          <NavLink className="text-accent-content" to="/about-us">
            Nosotros
          </NavLink>
          <NavLink className="text-accent-content" to="/contact">
            Contacto
          </NavLink>
          {!logged && (
            <>
              <NavLink className="text-accent-content" to="/login">
                Login
              </NavLink>
              <NavLink className="text-accent-content" to="/register">
                Registro
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
