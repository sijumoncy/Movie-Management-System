import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Modal from "../modal/Modal";
import MovieModal from "./MovieModal";
import axios from "../../api/axios";
import { IMovieResposne } from "../../Interface/movie";
import MovieList from "./MovieList";
import useAuth from "../../hooks/useAuth";

const displayFields = [
  "title",
  "description",
  "releaseYear",
  "rating",
  "genres",
  "director",
  "language",
];

function UserDashboard() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [addOrEditMovie, setAddorEditMovie] = useState("add");
  const [startProcess, setStartProcess] = useState(false);
  const [refreshUI, setRefreshUI] = useState(false);

  const [userMovieList, setUserMovieList] = useState<IMovieResposne[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editMovie, setEditMovie] = useState({edit:false, movieId:''})

  const {auth} = useAuth()

  const openModal = () => {
    setModalOpen(true);
    setStartProcess(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setStartProcess(false);
    setEditMovie({edit:false, movieId:''})
  };

  useEffect(() => {
    if(editMovie.edit) {
      setAddorEditMovie("edit")
      setModalTitle("Update Movie");
      openModal()
    }
  },[editMovie])

  useEffect(() => {
    if(refreshUI) {
      const timer = setTimeout(() => {
        setStartProcess(false)
      },1000)

      return () => clearTimeout(timer)
    }
  },[refreshUI])

  useEffect(() => {
    // get all user specific data for listing
    (async () => {
      try {
        const resposne = await axios.get(`/movies?user=${auth.user.id}`);
        setUserMovieList(resposne.data);
        setError("");
        setLoading(false);
      } catch (err) {
        console.log("err fetch movie ", err);
        setLoading(false);
        setError("failed to fetch movie");
      }
    })();
  }, [startProcess, refreshUI]);

  const triggerModalFunction = async () => {
    setStartProcess(true);
    console.log("click handle process");
  };

  return (
    <div className="p-2 relative flex flex-col">
      <button
        className="bg-green-700 flex gap-2 w-fit p-2 items-center hover:bg-green-600 cursor-pointer rounded-sm self-end"
        onClick={() => {
          setModalTitle("Add New Movie");
          setAddorEditMovie("add");
          openModal();
        }}
      >
        <span className="text-white">Add New</span>
        <FaPlus className="w-5 h-5 text-white " />
      </button>

      <div className="w-full  flex flex-col items-center">
        <h1 className="text-white text-xl justify-center">Your Movie List</h1>
        {loading && <div>Please wait. loading ....</div>}
        {error && (
          <div className="text-red-500">{`Failed to load collection. Try refresh ${error}`}</div>
        )}
        {!loading && !error && (
          <MovieList
            movieList={userMovieList}
            setRefreshUI={setRefreshUI}
            displayFields={displayFields}
            extraFeature={true}
            setEditMovie={setEditMovie}
          />
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        action={addOrEditMovie === 'edit' ? { buttonName: "update", onAction: triggerModalFunction } : { buttonName: "create", onAction: triggerModalFunction }}
        loading={startProcess}
      >
        <MovieModal
          action={addOrEditMovie}
          startProcess={startProcess}
          setStartProcess={setStartProcess}
          onClose={closeModal}
          movieId = {editMovie.movieId}
        />
      </Modal>
    </div>
  );
}

export default UserDashboard;
