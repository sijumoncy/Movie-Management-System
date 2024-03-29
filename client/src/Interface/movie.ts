export interface IMovieInput {
    title: string,
    description?:string,
    releaseYear:string,
    releaseMonth?:string,
    releaseDate?:number,
    rating?:number,
    duration?:string,
    genres:string,
    director:string,
    language:string,
    coverImage?:string,
}

export interface IMovieResposne {
    _id:string,
    title: string,
    description?:string,
    releaseYear:string,
    releaseMonth?:string,
    releaseDate?:number,
    rating?:number,
    duration?:string,
    genres:string[],
    director:string,
    language:string,
    coverImage?:string,
}