import { EntityState } from "@reduxjs/toolkit";
import "./App.css";
import {
  CartState,
  Entities,
  selectCart,
  selectCarts,
  useGetCartQuery,
  useGetCartsQuery,
} from "./store/reducer/cartsSlice";
import {
  MoviesState,
  SelectMovies,
  useGetMoviesQuery,
} from "./store/reducer/moviesSlice";
import {
  ProductState,
  selectProduct,
  selectProducts,
  useGetProductsQuery,
} from "./store/reducer/productSlice";
import { useAppSelector } from "./store/store";

function App() {
  const {
    isLoading: isLoadingProducts,
    isSuccess: isSuccessProducts,
    isError: isErrorProducts,
  } = useGetProductsQuery(undefined);
  const {
    isLoading: isLoadingCarts,
    isSuccess: isSuccessCarts,
    isError: isErrorCarts,
  } = useGetCartsQuery(undefined);

  const {
    isLoading: isLoadingCart,
    isSuccess: isSuccessCart,
    isError: isErrorCart,
  } = useGetCartQuery(1);

  const {
    isLoading: isLoadingMovies,
    isSuccess: isSuccessMovies,
    isError: isErrorMovies,
  } = useGetMoviesQuery(undefined);

  const products = useAppSelector(selectProducts);
  const product = useAppSelector(selectProduct(2));
  console.log("products", products);
  console.log("product", product);

  const carts = useAppSelector(selectCarts);
  const cart = useAppSelector(selectCart);
  const movies = useAppSelector(SelectMovies);

  const showProductList = (products: Array<ProductState>) => {
    const productList = products.map((product) => (
      <li key={product.title}>{product.title}</li>
    ));

    return <ul>{productList}</ul>;
  };
  const showCartList = (products: Array<CartState>) => {
    const productList = products.map((cart) => (
      <li key={cart.userId + cart.id}>{cart.userId}</li>
    ));

    return <ul>{productList}</ul>;
  };
  const showMovieList = (products: Array<MoviesState>) => {
    const productList = products.map((movie) => (
      <li key={movie.title}>{movie.title}</li>
    ));

    return <ul>{productList}</ul>;
  };

  return (
    <>
      <h1>Products</h1>
      {isLoadingProducts && <h1>Loading product</h1>}
      {isSuccessProducts && showProductList(products)}
      {isErrorProducts && <h1>{isErrorProducts}</h1>}
      <h1>Carts</h1>
      {isLoadingCarts && <h1>Loading Carts</h1>}
      {isSuccessCarts && showCartList(carts?.data as Array<CartState>)}
      {isErrorCarts && <h1>{isErrorCarts}</h1>}
      <h1>Cart</h1>
      {isLoadingCart && <h1>Loading Cart</h1>}
      {isSuccessCart && JSON.stringify(cart?.data)}
      {isErrorCart && <h1>{isErrorCart}</h1>}
      <h1>Movies</h1>
      {isLoadingMovies && <h1>Loading Movies</h1>}
      {isSuccessMovies && showMovieList(movies)}
      {isErrorMovies && <h1>{isErrorCarts}</h1>}
    </>
  );
}

export default App;
