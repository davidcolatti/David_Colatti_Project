import { Box } from "@chakra-ui/react";
import { useMovieQuotesById } from "../api/queries/useMovieQuotesById";
import InfiniteScroll from "react-infinite-scroll-component";
import { flatten } from "lodash";

export interface QuotesListProps {
  movieId: string;
}

const QuotesList = ({ movieId }: QuotesListProps) => {
  const {
    data: { pages = [] } = {},
    fetchNextPage,
    hasNextPage,
  } = useMovieQuotesById({ movieId });

  const quotesList = flatten(pages);

  return (
    <Box>
      <div id="quotes" style={{ maxHeight: "500px", overflow: "scroll" }}>
        <InfiniteScroll
          scrollableTarget="quotes"
          dataLength={quotesList.length}
          next={fetchNextPage}
          scrollThreshold={0.5}
          hasMore={hasNextPage ?? false}
          loader={<p>Loading more quotes...</p>}
          endMessage={
            <p>End of quotes list. {quotesList.length} total quotes.</p>
          }
        >
          {quotesList.map(({ _id, dialog }) => {
            return <Box key={_id}>{dialog}</Box>;
          })}
        </InfiniteScroll>
      </div>
    </Box>
  );
};

export default QuotesList;
