import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export interface MovieProps {
  setMovieId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Movie = ({ setMovieId }: MovieProps) => {
  const { movieId } = useParams();

  useEffect(() => {
    setMovieId(movieId);

    return () => {
      setMovieId(undefined);
    };
  }, [movieId, setMovieId]);

  return <div>Movie</div>;
};

export default Movie;
