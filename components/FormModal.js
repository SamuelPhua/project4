import useMovies from "@/hooks/useMovieList";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";
import Input from "./Input";

const FormModal = ({ setShowForm, movieData }) => {
  const { mutate } = useMovies();
  const [formData, setFormData] = useState(
    movieData || {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
      genre: "",
      duration: "",
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, videoUrl, thumbnailUrl, genre, duration } =
      formData;
    try {
      if (movieData) {
        try {
          const response = await axios.put(`/api/movies/${formData.id}`, {
            title,
            description,
            videoUrl,
            thumbnailUrl,
            genre,
            duration,
          });

          mutate();
        } catch (error) {
          console.log(error);
        }
      } else {
        const response = await axios.post("/api/add-new-movie", {
          title,
          description,
          videoUrl,
          thumbnailUrl,
          genre,
          duration,
        });

        mutate();
      }
    } catch (error) {
      console.log(error);
    }
    setShowForm(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative p-4 bg-zinc-900 mx-auto max-w-xl w-full rounded-md overflow-hidden">
        <div
          onClick={() => {
            setShowForm(false);
          }}
          className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
        >
          <XMarkIcon className="text-white w-6" />
        </div>
        <h1 className="text-center text-white font-semibold text-xl pb-2">
          Add Movie
        </h1>
        <form className="space-y-2" onSubmit={handleSubmit}>
          <Input
            id="title"
            type="text"
            label="Title"
            value={formData.title}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <Input
            id="description"
            type="text"
            label="description"
            value={formData.description}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <Input
            id="videoUrl"
            type="text"
            label="videoUrl"
            value={formData.videoUrl}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <Input
            id="thumbnailUrl"
            type="text"
            label="thumbnailUrl"
            value={formData.thumbnailUrl}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <Input
            id="genre"
            type="text"
            label="genre"
            value={formData.genre}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <Input
            id="duration"
            type="text"
            label="duration"
            value={formData.duration}
            onChange={(e) => {
              handleChange(e);
            }}
          />

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-[#D91F27] text-white py-1 w-full font-semibold text-xl rounded-md duration-300 hover:bg-transparent border-2 border-[#D91F27] hover:text-[#D91F27]"
            >
              {movieData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
