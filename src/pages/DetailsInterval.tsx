import React from "react";
import { useGetMovieQuery } from "../store/reducer/moviesSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DetailsInterval = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    isLoading: isLoadingMovie,
    isSuccess: isSuccessMovie,
    isError: isErrorMovie,
    data,
    refetch,
  } = useGetMovieQuery(id, { pollingInterval: 5000 });
  return (
    <>
      <button onClick={() => navigate("/")}>Back</button>
      <div>DetailsInterval</div>
      <h1>{t("movie")}</h1>
      {isLoadingMovie && <h1>Loading Movies</h1>}
      {isSuccessMovie && JSON.stringify(data)}
      {isErrorMovie && <h1>{isErrorMovie}</h1>}
      <button onClick={() => refetch()}>Refetch</button>
    </>
  );
};

export default DetailsInterval;
