import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const localApiSlice = createApi({
  reducerPath: "localApi",
  tagTypes: ["localApi"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
    prepareHeaders: (headers) => {
      headers.set("Content-type", "application/json");
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default localApiSlice;
