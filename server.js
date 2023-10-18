import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Datos de ejemplo (reemplaza esto con una base de datos real)
let movies = [
  { id: 1, title: "Pelicula 1", director: "Director 1" },
  { id: 2, title: "Pelicula 2", director: "Director 2" },
  { id: 3, title: "Pelicula 3", director: "Director 3" },
];

// Obtener todas las películas
app.get("/movies", (req, res) => {
  res.json(movies);
});

// Obtener una película por ID
app.get("/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    res.status(404).json({ mensaje: "Película no encontrada" });
  } else {
    res.json(movie);
  }
});

// Crear una nueva película
app.post("/movies", (req, res) => {
  const newMovie = req.body;
  newMovie.id = movies.length + 1;
  movies.push(newMovie);
  res
    .status(201)
    .json({ mensaje: "Película creada con éxito", movie: newMovie });
});

// Actualizar una película por ID
app.put("/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const updatedMovie = req.body;

  const index = movies.findIndex((m) => m.id === movieId);

  if (index === -1) {
    res.status(404).json({ mensaje: "Película no encontrada" });
  } else {
    movies[index] = { ...movies[index], ...updatedMovie };
    res.json({
      mensaje: "Película actualizada con éxito",
      movie: movies[index],
    });
  }
});

// Eliminar una película por ID
app.delete("/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const index = movies.findIndex((m) => m.id === movieId);

  if (index === -1) {
    res.status(404).json({ mensaje: "Película no encontrada" });
  } else {
    movies.splice(index, 1);
    res.json({ mensaje: "Película eliminada con éxito" });
  }
});

app.listen(port, () => {
  console.log(`Servidor API en ejecución en el puerto ${port}`);
});
