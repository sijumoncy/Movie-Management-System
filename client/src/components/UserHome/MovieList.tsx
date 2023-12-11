import { IMovieResposne } from "../../Interface/movie";
import { MovieEditAndDeleteUI } from "./MovieEditandDelete";

interface IMovieListInp {
  movieList: IMovieResposne[];
  displayFields: string[];
  extraFeature?: boolean;
  setRefreshUI?:React.Dispatch<React.SetStateAction<boolean>>
  setEditMovie?:React.Dispatch<React.SetStateAction<{ edit: boolean; movieId: string; }>>
}

function MovieList({
  movieList,
  displayFields,
  extraFeature,
  setRefreshUI,
  setEditMovie,
}: IMovieListInp) {
  console.log({ movieList });
  return (
    <div
      className="grid grid-flow-row gap-8 text-neutral-500 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-10 
         "
    >
      {movieList &&
        movieList.map((movie: IMovieResposne) => (
          <div
            key={movie._id}
            className="border-gray-300 border p-2 rounded-md"
          >
            <div className="">
                
              {Object.entries(movie).map(
                ([key, value]) =>
                  displayFields.includes(key) && (
                    <div key={key} className="flex gap-5 ">
                      <div>
                        <span className="">{key}</span>
                      </div>
                      <span>:</span>
                      {Array.isArray(value) ? (
                        <span className="text-white/70">{JSON.stringify(value)}</span>
                      ) : (
                        <span className="text-white/70">{value}</span>
                      )}
                    </div>
                  )
              )}
            </div>
            {/* extra fucntional part */}
            {extraFeature && (
            <div className="p-2 mt-5 border-t"> 
                <MovieEditAndDeleteUI key={movie._id} movieId={movie._id} setRefreshUI={setRefreshUI} setEditMovie={setEditMovie}/>
            </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default MovieList;
