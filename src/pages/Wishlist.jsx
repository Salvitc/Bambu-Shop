import React, { Suspense } from "react";
import { SectionTitle, WishItem } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../api";
import { useEffect } from "react";

const Wishlist = () => {
  const { wishItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getWishItems = async () => {
    const items = await Promise.all(wishItems.map(async (item) => {
      const product = await getProduct(item);
      return product;
    }));
    setItems(items);
  }

  useEffect(() => {
    setLoading(true);
    getWishItems();
    setLoading(false);
  }, [wishItems]);

  return (
    <>
      {loading ? <p>Cargando productos...</p> : <div>
        <SectionTitle title="Wishlist" path="Home | Wishlist" />
        <div className="max-w-7xl mx-auto">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-accent-content">Name</th>
                  <th className="text-accent-content">Precio</th>
                  <th className="text-accent-content">Categoría</th>
                  <th className="text-accent-content">Acción</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <WishItem
                    item={item}
                    key={index}
                    counter={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>}
    </>
  );
};

export default Wishlist;
