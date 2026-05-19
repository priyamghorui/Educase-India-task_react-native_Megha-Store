import apiClient from "./apiClient";

export const getCategories = async () => {
  const res = await apiClient.get("/products/category-list");
  return res.data;
};