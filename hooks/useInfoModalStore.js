import { useState } from "react";

const useInfoModalStore = () => {
  const [movieId, setMovieId] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (movieId) => {
    setIsOpen(true);
    setMovieId(movieId);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMovieId();
  };

  return {
    movieId,
    isOpen,
    openModal,
    closeModal,
  };
};

export default useInfoModalStore;
