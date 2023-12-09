import mongoose from "mongoose";

export interface IMovie extends Document {
    title: string,
    releaseYear:string,
    releaseMonth?:string,
    releaseDate?:number,
    rating?:number,
    duration?:string,
    genres:string[],
    director:string,
    language:string,
    coverImage?:string,
    user: mongoose.Schema.Types.ObjectId;
    _id: string;
}