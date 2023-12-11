import  { FC, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  action ?: {
    buttonName: string,
    onAction : () => void
  },
  loading:boolean
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children, action, loading }) => {
  const modalClass = isOpen ? 'block' : 'hidden';

  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${modalClass}`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

        <div
          className={`inline-block align-bottom bg-[#0d1117] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-md`}
        >
          <div className="bg-[#0d1117] px-4 py-2 text-primary border-b border-b-primary">
            <h4 className="text-lg font-semibold">{title}</h4>
          </div>

          <div className="bg-[#0d1117] px-4 py-6">
            {children}
          </div>

          <div className="bg-[#0d1117] px-4 py-2 w-full flex justify-end gap-10">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md "
              onClick={onClose}
            >
              Close
            </button>
            {action?.buttonName && (

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md "
              onClick={action.onAction}
            >
              {loading ? "processing" : action.buttonName}
            </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
