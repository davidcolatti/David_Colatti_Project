import { extendTheme, ChakraProvider, Flex } from "@chakra-ui/react";
import MoviesList from "./components/MoviesList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useMoviesList } from "./api/queries/useMoviesList";
import { useState } from "react";
import Movie from "./components/Movie";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

function App() {
  const [movieId, setMovieId] = useState<string>();
  const { data: moviesList = [] } = useMoviesList();

  console.log(movieId);
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Flex>
          <MoviesList moviesList={moviesList} movieId={movieId} />
          <Routes>
            <Route
              path="/movies/:movieId"
              element={<Movie setMovieId={setMovieId} />}
            />
          </Routes>
        </Flex>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
