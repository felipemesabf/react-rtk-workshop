import {
  MoviesState,
  useSetMovieMutation,
  useUpdateMovieMutation,
} from "../store/reducer/moviesSlice";

import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

type formValues = MoviesState;

const initialValues: formValues = {
  id: 0,
  director: "",
  title: "",
};

interface MovieFormProps {
  preData?: MoviesState;
}

const MovieForm = ({ preData }: MovieFormProps) => {
  const [createMovie] = useSetMovieMutation();
  const [updateMovie] = useUpdateMovieMutation();
  const [isEdit, setIsEdit] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<formValues>({
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (preData) {
      console.log(" preData", preData);
      setIsEdit(true);
      reset(preData);
    }
  }, [preData]);

  const onSubmit: SubmitHandler<formValues> = (data) => {
    isEdit ? updateMovie(data).unwrap() : createMovie(data); // both works
    reset(initialValues);
    setIsEdit(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
        padding: 10,
      }}
    >
      <label>title</label>
      <input
        placeholder="enter title"
        {...register("title", { required: true })}
      />
      {formState.errors.title && <span>This field is required</span>}
      <label>director</label>
      <input
        placeholder="enter director"
        {...register("director", { required: true })}
      />
      {formState.errors.director && <span>This field is required</span>}

      <button type="submit">{isEdit ? "Editar" : "Crear"}</button>
    </form>
  );
};

export default MovieForm;
