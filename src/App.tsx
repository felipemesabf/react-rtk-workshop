import "./App.css";
import {
  CartState,
  selectCarts,
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
    isLoading: isLoadingMovies,
    isSuccess: isSuccessMovies,
    isError: isErrorMovies,
  } = useGetMoviesQuery(undefined);

  const products = useAppSelector(selectProducts);
  const carts = useAppSelector(selectCarts);
  const movies = useAppSelector(SelectMovies);
  const product = useAppSelector(selectProduct(2));

  console.log("products", products);
  console.log("product", product);

  const showProductList = (products: Array<ProductState>) => {
    const productList = products.map((product) => <li>{product.title}</li>);

    return <ul>{productList}</ul>;
  };
  const showCartList = (products: Array<CartState>) => {
    const productList = products.map((cart) => <li>{cart.userId}</li>);

    return <ul>{productList}</ul>;
  };
  const showMovieList = (products: Array<MoviesState>) => {
    const productList = products.map((movie) => <li>{movie.title}</li>);

    return <ul>{productList}</ul>;
  };

  return (
    <>
      {isLoadingProducts && <h1>Loading product</h1>}
      {isSuccessProducts && showProductList(products)}
      {isErrorProducts && <h1>{isErrorProducts}</h1>}
      {isLoadingCarts && <h1>Loading Carts</h1>}
      {isSuccessCarts && showCartList(carts)}
      {isErrorCarts && <h1>{isErrorCarts}</h1>}
      {isLoadingMovies && <h1>Loading Movies</h1>}
      {isSuccessMovies && showMovieList(movies)}
      {isErrorMovies && <h1>{isErrorCarts}</h1>}
    </>
  );
}

export default App;
