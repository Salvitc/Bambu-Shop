import React, { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../api";

const Profile = () => {
  const [id, setId] = useState(localStorage.getItem("id"));
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const wishItems = useSelector((state) => state.wishlist.wishItems);
  const [loading, setLoading] = useState(true);
  const [userFormData, setUserFormData] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const response = await fetch("/api/user/token");
      const data = await response.json();
      setUserFormData({
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        password: ""
      });
    } catch (error) {
      toast.error("Error: ", error.response);
    }
  };

  useEffect(() => {
    if (loginState) {
      setLoading(true);
      getUserData();
      setLoading(false);
    } else {
      toast.error("Debes iniciar sesión para acceder a esta página");
      navigate("/");
    }
  }, []);

  const updateProfile = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await updateUser(userFormData);

    if (response.ok) {
      toast.success("Perfil actualizado correctamente");
    }

    setLoading(false);
  }

  return (
    <>
      <SectionTitle title="User Profile" path="Home | User Profile" />
      {loading ? <div className="text-center">Cargando...</div> :
        <form className="max-w-7xl mx-auto text-center px-10" onSubmit={updateProfile}>
          <div className="grid grid-cols-3 max-lg:grid-cols-1">
            <div className="form-control w-full lg:max-w-xs">
              <label className="label">
                <span className="label-text">Nombre</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full lg:max-w-xs"
                value={userFormData.name}
                onChange={(e) => { setUserFormData({ ...userFormData, name: e.target.value }) }}
              />
            </div>

            <div className="form-control w-full lg:max-w-xs">
              <label className="label">
                <span className="label-text">Apellidos</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full lg:max-w-xs"
                value={userFormData.lastname}
                onChange={(e) => { setUserFormData({ ...userFormData, lastname: e.target.value }) }}
              />
            </div>

            <div className="form-control w-full lg:max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Type here"
                className="input input-bordered w-full lg:max-w-xs"
                value={userFormData.email}
                onChange={(e) => { setUserFormData({ ...userFormData, email: e.target.value }) }}
              />
            </div>

            <div className="form-control w-full lg:max-w-xs">
              <label className="label">
                <span className="label-text">Teléfono</span>
              </label>
              <input
                type="tel"
                placeholder="Type here"
                className="input input-bordered w-full lg:max-w-xs"
                value={userFormData.phone}
                onChange={(e) => { setUserFormData({ ...userFormData, phone: e.target.value }) }}
              />
            </div>

            <div className="form-control w-full lg:max-w-xs">
              <label className="label">
                <span className="label-text">Dirección</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full lg:max-w-xs"
                value={userFormData.address}
                onChange={(e) => { setUserFormData({ ...userFormData, address: e.target.value }) }}
              />
            </div>

            <div className="form-control w-full lg:max-w-xs">
              <label className="label">
                <span className="label-text">Contraseña</span>
              </label>
              <input
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full lg:max-w-xs"
                value={userFormData.password}
                onChange={(e) => { setUserFormData({ ...userFormData, password: e.target.value }) }}
              />
            </div>
          </div>
          <button
            className="btn btn-lg bg-green-700 hover:bg-green-900 text-white mt-10"
            type="submit"
          >
            Actualizar perfil
          </button>
        </form>}
    </>
  );
};

export default Profile;
