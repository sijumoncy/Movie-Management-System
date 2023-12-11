import {  IMovieResposne } from '../../Interface/movie';

interface IMovieListInp {
    movieList : IMovieResposne[]
    displayFields : string[]
}

function MovieList({movieList, displayFields}:IMovieListInp) {
    console.log({movieList})
  return (
    
    <div className="grid grid-flow-row gap-8 text-neutral-500 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-10 
         ">
        {movieList && movieList.map((movie:IMovieResposne) => (
            <div key={movie._id} className="border-gray-300 border p-2 rounded-md">
            {Object.entries(movie).map(([key,value]) => (
              displayFields.includes(key) && (
              <div key={key} className="flex gap-5 ">
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
  )
}

export default MovieList