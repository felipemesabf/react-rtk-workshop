import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { productSlice } from "./reducer/productSlice";
import apiSlice from "./api/apiSlice";
import { cartSlice } from "./reducer/cartsSlice";
import localApiSlice from "./api/localApiSlice";
import { moviesSlice } from "./reducer/moviesSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [localApiSlice.reducerPath]: localApiSlice.reducer,
  [productSlice.name]: productSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [moviesSlice.name]: moviesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      localApiSlice.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
export { useAppDispatch, useAppSelector };
