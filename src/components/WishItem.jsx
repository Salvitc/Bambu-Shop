import React, { useEffect } from "react";
import { FaHeartCrack } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { updateWishlist } from "../features/wishlist/wishlistSlice";
import { toast } from "react-toastify";
import { deleteFromWishlist, getWishlist } from "../api";

const WishItem = ({ item, counter }) => {
  const dispatch = useDispatch();

  const removeFromWishlistHandler = async (product) => {
    const wishlist = await getWishlist();
    const updatedWishlist = wishlist.filter((item) => item !== product._id);
    const response = await deleteFromWishlist(updatedWishlist);

    if (response.ok) {
      dispatch(updateWishlist(updatedWishlist))
      toast.success("Producto eliminado de la lista de deseos");
    } else {
      toast.error("No se pudo eliminar el producto de la lista de deseos");
    }
  }

  return (
    <tr className="hover cursor-pointer">
      <th className="text-accent-content">{counter + 1}</th>
      <td className="text-accent-content">{item.name}</td>
      <td className="text-accent-content">{item.price} €</td>
      <td className="text-accent-content">{item.category}</td>
      <td>
        <button className="btn btn-xs btn-error text-sm" onClick={() => removeFromWishlistHandler(item)}>
          <FaHeartCrack />
          Eliminar de la lista de deseos
        </button>
      </td>
    </tr>
  );
};

export default WishItem;
