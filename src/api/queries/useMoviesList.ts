import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../fetchApi";

export interface Movie {
  _id: string;
  name: string;
  academyAwardWins: number;
  academyAwardNominations: number;
  rottenTomatoesScore: number;
  boxOfficeRevenueInMillions: number;
}

export const MOVIES_QK = "MOVIES";

export const useMoviesList = () => {
  return useQuery<Movie[]>([MOVIES_QK], async () => {
    const { data } = await fetchApi<{ docs: Movie[] }>("/movie");
    return data.docs;
  });
};
