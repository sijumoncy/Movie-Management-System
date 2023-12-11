import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { deleteMovie } from "../../utils/deleteMovie";
import { toast } from "react-toastify";

export const MovieEditAndDeleteUI = ({
  movieId,
  setRefreshUI,
  setEditMovie,
}: {
  movieId: string;
  setRefreshUI: React.Dispatch<React.SetStateAction<boolean>>;
  setEditMovie?:React.Dispatch<React.SetStateAction<{ edit: boolean; movieId: string; }>>
}) => {
  const { auth } = useAuth();

  const handleDeleteMovie = async () => {
    const response: { error: boolean; success: boolean; data: unknown } =
      await deleteMovie(auth.tokens.access.token, movieId);
    if (response.error) {
      toast.error("faield to delete movie");
    } else if (response.success) {
      toast.success("movie deleted successfully");
      setRefreshUI(true)
    }
  };

  const handleEditMovie = async () => {
    console.log("in edit");
    if(setEditMovie) {
        setEditMovie({edit:true, movieId:movieId})
    }else{
        console.log("can not edit , can not call");
        
    }
  };

  return (
    <div className="flex gap-5 justify-end">
      <button onClick={() => handleEditMovie()}>
        <FaRegEdit className="w-6 h-6 cursor-pointer hover:text-green-500" />
      </button>

      <button onClick={() => handleDeleteMovie()}>
        <MdDelete className="w-6 h-6 cursor-pointer hover:text-red-500" />
      </button>
    </div>
  );
};
