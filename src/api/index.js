import { withOptions } from "tailwindcss/plugin";

export const getProducts = async () => {
  const response = await fetch('/api/product');
  return await response.json();
}
 
export const getProduct = async (id) => {
  const response = await fetch(`/api/product/${id}`);
  return await response.json();
}

export const getLoggedIn = async () => {
  const response = await fetch('/api/user/role');
  
  if (response.ok) {
    return true;
  } else {
    return false;
  }
}

export const logout = async () => {
const response = await fetch('/api/logout', {
    method: 'POST',
  });
return response;
}

export const register = async (regObj) => {
  regObj = {
    ...regObj,
    role: {
      code: "CUSTOMER"
    },
  };

  const response = fetch("/api/user", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(regObj),
  })

  return response;
}

export const updateUser = async (userObj) => {
  const user = await fetch("/api/user/token");
  const data = await user.json();

  const json = {
    ...userObj,
    role: {
      code: data.role.code,
    },
  }
  const response = fetch(`/api/user/${data._id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(json),
  })

  return response;
}

export const getUserData = async () => {
  const user = await fetch("/api/user/token");
  return await user.json();
}

export const putWishlist = async(idProduct) => {
  const user = await fetch("/api/user/token");
  const data = await user.json();
  
  let json = data.wishlist;
  if(json){
    json.push(idProduct);
  } else {
    json = [idProduct];
  }
  const response = await fetch(`/api/user/${data._id}/wishlist`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(json),
  })

  return response;
}

export const putCart = async(product_id, price, amount) => {
  const user = await fetch("/api/user/token");
  const data = await user.json();
  
  const cartItem = {
    product_id,
    price,
    amount,
  }

  let json = data.cart;
  if(json){
    let exists = false;
    json.map((item) => {
      if(item.product_id === product_id){
        item.amount += amount;
        exists = true;
      }
    })
    if(!exists){
      json.push(cartItem)
    }
  } else {
    json = [cartItem];
  }

  const response = await fetch(`/api/user/${data._id}/cart`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(json),
  })

  return response;
}

export const deleteFromWishlist = async(idProduct) => {
  const user = await fetch("/api/user/token");
  const data = await user.json();
  
  const response = await fetch(`/api/user/${data._id}/wishlist`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(idProduct),
  })

  return response;
}

export const deleteCartItem = async(product_id) => {
  const user = await fetch("/api/user/token");
  const data = await user.json();
  
  let json = data.cart;
  if(json){
    json = json.filter((item) => item.product_id !== product_id);
  }
  
  const response = await fetch(`/api/user/${data._id}/cart`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(json),
  })

  return response;
}

export const currentCartToOrder = async () => {
  const response = await fetch("/api/order/dump", {
    method: "PUT",
  });

  return response;
}


export const clearCart = async () => {
  const user = await fetch("/api/user/token");
  const data = await user.json();
  
  const response = await fetch(`/api/user/${data._id}/cart`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify([]),
  })

  return response;
}

export const getOrders = async () => {
  const user = await fetch("/api/user/token");
  const data = await user.json();
  
  const response = await fetch(`/api/order/${data._id}`);
  return await response.json();
}
