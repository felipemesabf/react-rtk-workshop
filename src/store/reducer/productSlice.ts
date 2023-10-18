import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import { RootState } from "../store";
import apiSlice from "../api/apiSlice";

export interface ProductState {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}

const productAdapter = createEntityAdapter<ProductState>({
  selectId: (product) => product.id,
});

const initialState = productAdapter.getInitialState({});

const extendedAuthApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "products",
      }),
      transformResponse: (response: ProductState[]): ProductState[] => response,
    }),
  }),
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      extendedAuthApi.endpoints.getProducts.matchFulfilled,
      (state, { payload }) => {
        productAdapter.setAll(state, payload);
      }
    );
  },
});

// Reducers
export const { useGetProductsQuery } = extendedAuthApi;

// Selectors
const { selectById, selectAll } = productAdapter.getSelectors();

const productState = (state: RootState) => state.product;

export const selectProduct = (id: number) =>
  createSelector(productState, (state) => selectById(state, id));

export const selectProducts = createSelector(productState, (state) =>
  selectAll(state)
);
