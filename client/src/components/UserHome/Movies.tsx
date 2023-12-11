import { IMovieResposne } from "../../Interface/movie"
import useGetAllMovie from "../../hooks/useGetAllMovie"

const displayFields = ["title", "description", 'releaseYear', 'rating', 'genres', 'director', 'language']

// list all movies avaialble as open in db 
function Movies() {

  const {allCollection, loading, error} = useGetAllMovie()

  console.log({allCollection, loading, error});
  
  
  return (
    <div className="text-white p-2 flex flex-col w-full items-center">
      <h1 className="mt-5 text-xl">Movie World All Collection</h1>

      <div>
        {loading && <div>Please wait. loading ....</div>}
        {error && <div className="text-red-500">{`Failed to load collection. Try refresh ${error}`}</div>}
        <div className="grid grid-flow-row gap-8 text-neutral-500 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-10 
         ">
        {allCollection && !loading && !error && allCollection.map((movie:IMovieResposne) => (
            <div className="border-gray-300 border p-2 rounded-md">
            {Object.entries(movie).map(([key,value]) => (
              displayFields.includes(key) && (
              <div className="flex gap-5 ">
                <div>

                <span>{key}</span>
                </div>
                <span>:</span>
                {Array.isArray(value) ? (
                    <span>{JSON.stringify(value)}</span>
                ) : (
                <span>value</span>
                )}
              </div>
              )
            ))}
            </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Movies