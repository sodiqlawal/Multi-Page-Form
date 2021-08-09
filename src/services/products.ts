import { api } from "services/api";
import {
  DeleteProductPayload,
  TCreateProductPayload,
  TEditProductPayload,
} from "store/actions/products";

export const fetchProductService = () => api("products", "GET");

export const createProductService = ({ product }: TCreateProductPayload) =>
  api("products", "POST", {
    body: { ...product },
  });

export const editProductService = ({ id, product }: TEditProductPayload) =>
  api(`products/${id}`, "PATCH", {
    body: { ...product },
  });

export const deleteProductService = ({ id }: DeleteProductPayload) =>
  api(`products/${id}`, "DELETE");
