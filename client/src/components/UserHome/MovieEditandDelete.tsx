import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { deleteMovie } from "../../utils/deleteMovie";
import { toast } from "react-toastify";

export const MovieEditAndDeleteUI = ({
  movieId,
  doRefresh,
}: {
  movieId: string;
  doRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { auth } = useAuth();

  const handleDeleteMovie = async () => {
    const response: { error: boolean; success: boolean; data: unknown } =
      await deleteMovie(auth.tokens.access.token, movieId);
    if (response.error) {
      toast.error("faield to delete movie");
    } else if (response.success) {
      toast.success("movie deleted successfully");
      doRefresh(true)
    }
  };

  const handleEditMovie = async () => {
    console.log("in edit");
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
