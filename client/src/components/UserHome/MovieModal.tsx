// add - edit movie data
// Genere need to be added as a new db table : currenlty implement as any string 

import { useEffect, useState } from "react";
import { FaInfo } from "react-icons/fa6";
import { IMovieInput } from "../../Interface/movie";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { toast } from 'react-toastify';

interface MovieModalI {
  action: string;
  startProcess: boolean
  setStartProcess: React.Dispatch<React.SetStateAction<boolean>>
  onClose: () => void
}

const movieInputData = [
  { fieldName: "title", inputType: "text", required: true },
  { fieldName: "description", inputType: "text", required: false },
  { fieldName: "releaseYear", inputType: "text", required: true },
  { fieldName: "releaseMonth", inputType: "text", required: false },
  { fieldName: "releaseDate", inputType: "number", required: false },
  { fieldName: "rating", inputType: "number", required: false },
  { fieldName: "duration", inputType: "text", required: false },
  {
    fieldName: "genres",
    inputType: "text",
    required: true,
    info: "add multile generes seperated by comma",
  },
  { fieldName: "director", inputType: "text", required: true },
  { fieldName: "language", inputType: "text", required: true },
];

function MovieModal({ action, startProcess, setStartProcess, onClose }: MovieModalI) {
  const [movieData, setMovieData] = useState<IMovieInput | null>(null);
  const [errmsg, setErrMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const {auth} = useAuth()

  console.log({startProcess});
  

  useEffect(() => {
    if (action === "edit") {
      // get the current item values
    }
  }, [action]);

  const validateAddMovieAndCreate = async () => {
    // simple validation - imlement later detailed validation
    // only check for mandidatory fields
    if(movieData && movieData["title"] && movieData["releaseYear"] && movieData["director"] && movieData["language"]) {
        const generesArr = movieData.genres.split(',')
        try{
          if(generesArr.length > 0) {
            setErrMsg('')
            console.log("sending create req");
            
            const resposne = await axios.post('/movies', JSON.stringify({
                ...movieData,
                genres : generesArr,

              }),{
                headers: {'Content-Type':'application/json', 
                    Authorization : `bearer ${auth.tokens.access.token}`},
                withCredentials:true
                
              })
              console.log({resposne});
              toast.success(resposne.data.message);
              setMovieData(null)
              setStartProcess(false)
              onClose()
              
        } else {
            setErrMsg('At lease one genere is required')
            setStartProcess(false)
        }
        } catch(err) {
          toast.error("error creating movie");
          setStartProcess(false)
        }
    }
  }

  useEffect(() => {
    if(startProcess) {
        console.log({startProcess});
        
        validateAddMovieAndCreate()
    }
  },[startProcess])

  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMovieData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <form className="text-white flex flex-col gap-5">
        {movieInputData.map((field) => (
          <div>
            <label className="input-label flex gap-2" htmlFor="email">
              {field.fieldName}
              {field.required && <span className="text-red-500">*</span>}
              {field.info && (
                <div title={field.info} className="cursor-pointer">
                  <FaInfo className="w-4 h-4 text-primary" />
                </div>
              )}
            </label>
            <input
              className="input-box"
              type={field.inputType}
              id={field.fieldName}
              name={field.fieldName}
              autoComplete="off"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e)
              }
              aria-describedby="title is requiered"
            />
          </div>
        ))}
        <div className="mt-2">
            {errmsg && <span className="text-red-500">{errmsg}</span>}
            {successMsg && <span className="text-green-500">{successMsg}</span>}
        </div>
      </form>
    </div>
  );
}

export default MovieModal;
