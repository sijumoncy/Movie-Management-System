import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Modal from "../modal/Modal";
import MovieModal from "./MovieModal";

function UserDashboard() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('')
  const [addOrEditMovie, setAddorEditMovie] = useState('add')
  const [startProcess, setStartProcess ] = useState(false)

  const openModal = () => {
    setModalOpen(true);
    setStartProcess(false)
  };

  const closeModal = () => {
    setModalOpen(false);
    setStartProcess(false)
  };

  useEffect(() => {
    // get all user specific data for listing
  }, []);


  const handleAddMovie = async () => {
    setStartProcess(true)
    console.log("click handle process");
  }

  return (
    <div className="p-2 relative flex flex-col">
      <button
        className="bg-green-700 flex gap-2 w-fit p-2 items-center hover:bg-green-600 cursor-pointer rounded-sm self-end"
        onClick={() => {setModalTitle('Add New Movie'); setAddorEditMovie('add'); openModal()}}
      >
        <span className="text-white">Add New</span>
        <FaPlus className="w-5 h-5 text-white " />
      </button>

      <div className="">{/* list movies */}</div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle} action={{buttonName:'create', onAction: handleAddMovie}} loading={startProcess} >
        <MovieModal action={addOrEditMovie} startProcess={startProcess} setStartProcess={setStartProcess} onClose={closeModal} />
      </Modal>
    </div>
  );
}

export default UserDashboard;
