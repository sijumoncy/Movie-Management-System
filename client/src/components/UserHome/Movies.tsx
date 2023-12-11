import useGetAllMovie from "../../hooks/useGetAllMovie";
import MovieList from "./MovieList";

const displayFields = [
  "title",
  "description",
  "releaseYear",
  "rating",
  "genres",
  "director",
  "language",
];

// list all movies avaialble as open in db
function Movies() {
  const { allCollection, loading, error } = useGetAllMovie();

  return (
    <div className="text-white p-2 flex flex-col w-full items-center">
      <h1 className="mt-5 text-xl">Movie World All Collection</h1>

      <div>
        {loading && <div>Please wait. loading ....</div>}
        {error && (
          <div className="text-red-500">{`Failed to load collection. Try refresh ${error}`}</div>
        )}
        {!loading && !error && (
          <MovieList
            displayFields={displayFields}
            movieList={allCollection}
          />
        )}
      </div>
    </div>
  );
}

export default Movies;
