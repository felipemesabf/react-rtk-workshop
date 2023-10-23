import { useTranslation } from "react-i18next";
import { Menu } from "./Menu";
import {
  CartState,
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
import { useNavigate } from "react-router-dom";

const Landing = () => {
  console.log("me renderise");

  const { t } = useTranslation();
  const navigate = useNavigate();

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
      <button onClick={() => navigate("juan")}>send</button>
      <Menu />
      <h1>{t("products")}</h1>
      {isLoadingProducts && <h1>Loading product</h1>}
      {isSuccessProducts && showProductList(products)}
      {isErrorProducts && <h1>{isErrorProducts}</h1>}
      <h1>{t("product")}</h1>
      {isSuccessProducts && JSON.stringify(product)}
      <h1>{t("carts")}</h1>
      {isLoadingCarts && <h1>Loading Carts</h1>}
      {isSuccessCarts && showCartList(carts?.data as Array<CartState>)}
      {isErrorCarts && <h1>{isErrorCarts}</h1>}
      <h1>{t("cart")}</h1>
      {isLoadingCart && <h1>Loading Cart</h1>}
      {isSuccessCart && JSON.stringify(cart?.data)}
      {isErrorCart && <h1>{isErrorCart}</h1>}
      <h1>{t("movies")}</h1>
      {isLoadingMovies && <h1>Loading Movies</h1>}
      {isSuccessMovies && showMovieList(movies)}
      {isErrorMovies && <h1>{isErrorCarts}</h1>}
    </>
  );
};

export default Landing;
