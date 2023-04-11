import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchApi } from "../fetchApi";

export interface UseMovieQuotesByIdArgs {
  movieId?: string;
}

export interface MovieQuote {
  character: string;
  dialog: string;
  _id: string;
  movie: string;
}

interface PaginatedMovieQuotes {
  docs: MovieQuote[];
  limit: number;
  offset: number;
  page: number;
  pages: number;
}

const PAGE_LIMIT = 1000;
export const MOVIE_QUOTES_BY_ID_QK = "MOVIE_QUOTES_BY_ID";

export const useMovieQuotesById = ({ movieId }: UseMovieQuotesByIdArgs) => {
  return useInfiniteQuery<MovieQuote[]>(
    [MOVIE_QUOTES_BY_ID_QK, movieId],
    async ({ pageParam = 0 }) => {
      const offsetParam = pageParam * PAGE_LIMIT;

      const { data } = await fetchApi<PaginatedMovieQuotes>(
        `/movie/${movieId}/quote?offset=${offsetParam}`
      );
      return data.docs;
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.length <= PAGE_LIMIT ?? undefined,
      enabled: !!movieId,
    }
  );
};
