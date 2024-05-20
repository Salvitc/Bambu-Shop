export const getProducts = async () => {
  const response = await fetch('/api/product');
  return await response.json();
}

export const getProduct = async (id: string) => {
  const response = await fetch(`/api/product/${id}`);
  return await response.json();
}

export const isLoggedIn = async () => {
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
