import { useEffect, useState } from "react";
import axios from "../api/axios";
import { IMovieResposne } from "../Interface/movie";

const useGetAllMovie = () => {
  const [allCollection, setAllCollection] = useState<IMovieResposne[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAllMovie = async () => {
    try {
      const resposne = await axios.get("/movies");
      console.log("all movie : ", { resposne });
      setAllCollection(resposne.data);
      setError("");
      setLoading(false);
    } catch (err) {
      console.log("err fetch movie ", err);
      setLoading(false);
      setError("failed to fetch movie");
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllMovie();
  }, []);

  return { allCollection, loading, error };
};

export default useGetAllMovie;
