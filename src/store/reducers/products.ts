import { createReducer } from "@reduxjs/toolkit";
import * as productActions from "store/actions/products";
import { TProduct } from "models/product";

export interface TProductsState {
  total: number;
  products: TProduct[];
  isLoading: boolean;
  isDeleteLoading: boolean;
  isEditLoading: boolean;
  isCreateLoading: boolean;
  error?: Error;
}

const initialState: TProductsState = {
  total: 0,
  products: [],
  isLoading: false,
  isDeleteLoading: false,
  isEditLoading: false,
  isCreateLoading: false,
};

const productReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(productActions.fetchProducts, (state) => {
      state.isLoading = true;
    })
    .addCase(productActions.fetchProductsSuccess, (state, action) => {
      state.products = action.payload.products;
      state.total = action.payload.total;
      state.isLoading = false;
    })
    .addCase(productActions.fetchProductsError, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    })

    // create product
    .addCase(productActions.createProduct, (state) => {
      state.isCreateLoading = true;
    })
    .addCase(productActions.createProductSuccess, (state) => {
      state.isCreateLoading = false;
    })
    .addCase(productActions.createProductError, (state) => {
      state.isCreateLoading = false;
    })

    // edit product
    .addCase(productActions.editProduct, (state) => {
      state.isEditLoading = true;
    })
    .addCase(productActions.editProductSuccess, (state) => {
      state.isEditLoading = false;
    })
    .addCase(productActions.editProductError, (state) => {
      state.isEditLoading = false;
    })

    // delete product
    .addCase(productActions.deleteProduct, (state) => {
      state.isDeleteLoading = true;
    })
    .addCase(productActions.deleteProductSuccess, (state, action) => {
      state.isDeleteLoading = false;
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      state.total = state.products.length;
    })
    .addCase(productActions.deleteProductError, (state, action) => {
      state.isDeleteLoading = false;
      state.error = action.payload.error;
    })
);

export default productReducer;
