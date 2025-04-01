import { useState } from 'react'
import ReactModal from 'react-modal'
import Image from 'next/image'

// Set the app element to avoid accessibility warnings
ReactModal.setAppElement('#__next')

interface MediaModalProps {
  title: string
  file: string
  description: string
}

const MediaModal: React.FC<MediaModalProps> = ({ title, file, description }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const renderFile = (file: string) => {
    if (file !== null) {
      return <Image src={file} alt={title} className="mb-4" width={1000} height={1000} quality={50} style={{ width: "auto", height: "auto" }} />
    }
    return (
      <div className="flex items-center justify-center">
        <p className="text-red-500">No file attached!</p>
      </div>
    )
  }

  return (
    <>
      <button
        className="text-slate-800 dark:text-slate-200 px-4 py-2 bg-sky-400 dark:bg-sky-800 rounded-lg hover:bg-sky-500 dark:hover:bg-sky-900"
        onClick={openModal}
      >
        {title}
      </button>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Media Modal"
        className="modal dark:bg-slate-800 dark:text-slate-100"
        overlayClassName="modal-overlay"
      >
        {/* Modal Body */}
        <div className="h-full">
          {/* Header Section */}
          <div className="sticky top-0 bg-white dark:bg-slate-800 py-3 z-10">
            <button
              className="absolute top-4 right-0 font-extrabold bg-red-700 text-red-300 rounded-full hover:text-red-400"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold text-center">{title}</h2>
          </div>

          {/* Content Section */}
          <div className="p-4">
            {renderFile(file)}
            {description && <p className="mt-4">{description}</p>}
          </div>
        </div>
      </ReactModal>
    </>
  )
}


export default MediaModal
