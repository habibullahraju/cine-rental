import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { MovieContex } from "../contex";
import { getImgUrl } from "../utils/cine-utility";
import MovieDetailsModal from "./MovieDetailsModal";
import Rating from "./Rating";

export default function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { state, dispatch } = useContext(MovieContex);
  function handleCloseModal() {
    setSelectedMovie(null);
    setShowModal(false);
  }
  function handleMovieselection(movie) {
    setSelectedMovie(movie);
    setShowModal(true);
  }
  function handleAddToCart(e, movie) {
    e.stopPropagation();
    console.log(movie);

    const found = state.cartData.find((item) => {
      return item.id == movie.id;
    });
    if (!found) {
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...movie },
      });
      toast.success(`Movie ${movie.title} added succesfully`, {
        position: "bottom-right",
      });
    } else {
      toast.error(`Movie ${movie.title} has been added already!`, {
        position: "bottom-right",
      });
    }
  }
  return (
    <>
      {showModal && (
        <MovieDetailsModal
          movie={selectedMovie}
          onCloseModal={handleCloseModal}
          onCartAdd={handleAddToCart}
        />
      )}
      <figure className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl">
        <a href="#" onClick={() => handleMovieselection(movie)}>
          <img
            className="w-full object-cover"
            src={getImgUrl(movie.cover)}
            alt={movie.title}
          />
          <figcaption className="pt-4">
            <h3 className="text-xl mb-1">{movie.title}</h3>
            <p className="text-[#575A6E] text-sm mb-2">{movie.genre}</p>
            <div className="flex items-center space-x-1 mb-5">
              <Rating value={movie.rating} />
            </div>

            <button
              onClick={(e) => handleAddToCart(e, movie)}
              className="bg-primary cursor-pointer rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
            >
              <img src="./assets/tag.svg" alt="" />
              <span>${movie.price} | Add to Cart</span>
            </button>
          </figcaption>
        </a>
      </figure>
    </>
  );
}
