import {
  Box,
  Container,
  Heading,
  Spinner,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMovieById } from "../api/queries/useMovieById";
import { useMovieQuotesById } from "../api/queries/useMovieQuotesById";
import QuotesList from "./QuotesList";

export interface MovieProps {
  setMovieId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Movie = ({ setMovieId }: MovieProps) => {
  const { movieId } = useParams();
  const { data: movie, isLoading: isLoadingMovie } = useMovieById({ movieId });
  useMovieQuotesById({ movieId });

  useEffect(() => {
    setMovieId(movieId);
    return () => {
      setMovieId(undefined);
    };
  }, [movieId, setMovieId]);

  return (
    <Container display="flex" alignItems="center" justifyContent="center">
      {isLoadingMovie ? (
        <Spinner size="xl" />
      ) : (
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <Heading as="h2">{movie?.name}</Heading>
          <Box>Characters</Box>
          <QuotesList movieId={movieId ?? ""} />
        </VStack>
      )}
    </Container>
  );
};

export default Movie;
