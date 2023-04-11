import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../fetchApi";
import { Movie } from "./useMoviesList";

export interface UseMovieByIdArgs {
  movieId?: string;
}

export const MOVIE_BY_ID_QK = "MOVIE_BY_ID";

export const useMovieById = ({ movieId }: UseMovieByIdArgs) => {
  return useQuery<Movie>(
    [MOVIE_BY_ID_QK, movieId],
    async () => {
      const { data } = await fetchApi<{ docs: Movie[] }>(`/movie/${movieId}`);
      return data.docs[0];
    },
    { enabled: !!movieId }
  );
};
