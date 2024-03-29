import { Schema, model, models } from 'mongoose';
import { IMovie } from '../interfaces/Movie';
import { number } from 'joi';
import { movieDurationRegex } from '../constants/regex';

export const MovieSchema: Schema<IMovie> = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description:{
      type:String,
      default:''
    },
    releaseYear: {
      type: String,
      trim: true,
      required: true,
    },
    releaseMonth: {
      type: String,
    },
    releaseDate: {
      type: Number,
      min: 1,
      max: 31,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default:0
    },
    duration: {
      type: String,
      match: movieDurationRegex,
    },
    genres: {
      type: [String],
      required: true,
      validate: {
        validator: function (value: string[]) {
          return value.length >= 1;
        },
        message: 'At least one genre is required.',
      },
    },
    director: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Movie || model<IMovie>('Movie', MovieSchema);