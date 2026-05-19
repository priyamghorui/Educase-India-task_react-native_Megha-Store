import apiClient from "./apiClient";

export const getProductsByCategory = async (limit,currentSkip) => {
  const res = await apiClient.get(`/products?limit=${limit}&skip=${currentSkip}`);
  return res.data;
};