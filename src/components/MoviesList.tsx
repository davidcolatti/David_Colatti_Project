import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Link,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { formatMillionCurrency } from "../utils";
import { Movie } from "../api/queries/useMoviesList";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";

export interface MoviesListProps {
  movieId?: string;
  moviesList: Movie[];
}

const MoviesList = ({ moviesList, movieId }: MoviesListProps) => {
  const selectedMovie = useMemo(() => {
    return moviesList.find(({ _id }) => _id === movieId);
  }, [moviesList, movieId]);

  return (
    <Card>
      <CardHeader>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={NavLink} to="/">
              Movies
            </BreadcrumbLink>
          </BreadcrumbItem>

          {selectedMovie !== undefined ? (
            <BreadcrumbItem>
              <BreadcrumbLink as={NavLink} to="/">
                {selectedMovie.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ) : null}
        </Breadcrumb>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {moviesList.map(
            ({
              _id,
              name,
              rottenTomatoesScore,
              boxOfficeRevenueInMillions,
            }) => (
              <Link as={NavLink} to={`/movies/${_id}`} key={_id}>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    {name}
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    Rotten Tomatoes: {Math.round(rottenTomatoesScore)}% |
                    Revenue {formatMillionCurrency(boxOfficeRevenueInMillions)}
                  </Text>
                </Box>
              </Link>
            )
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default MoviesList;
