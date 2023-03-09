import { PlayIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useState } from "react";
import FormModal from "./FormModal";
import axios from "axios";

const AdminMovieCard = ({ data, mutate }) => {
  const router = useRouter();
  const redirectToWatch = () => router.push(`/watch/${data.id}`);
  const [showForm, setShowForm] = useState(false);

  const HandleDelete = async () => {
    try {
      await axios.delete(`/api/movies/${data.id}`, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {showForm && <FormModal setShowForm={setShowForm} movieData={data} />}
      <div className="group bg-zinc-900 duration-300 col-span relative h-[12vw]">
        <img
          onClick={redirectToWatch}
          src={data.thumbnailUrl}
          alt="Movie"
          draggable={false}
          className="cursor-pointer  object-cover  transition  duration  shadow-xl  rounded-md  group-hover:opacity-90  sm:group-hover:opacity-0  duration-300 delay-300  w-full  h-[12vw]"
        />
        <div className=" opacity-0 absolute top-0 transition z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 duration-300 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
          <img
            onClick={redirectToWatch}
            src={data.thumbnailUrl}
            alt="Movie"
            draggable={false}
            className=" cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]"
          />
          <div className=" z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md ">
            <div className="flex flex-row items-center gap-3">
              <div
                onClick={redirectToWatch}
                className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition duration-300 hover:bg-neutral-300"
              >
                <PlayIcon className="text-black w-4 lg:w-6" />
              </div>
              <div
                onClick={() => {
                  setShowForm(true);
                }}
                className="text-white cursor-pointer"
              >
                Edit
              </div>
              <div
                onClick={() => {
                  HandleDelete();
                }}
                className="text-white cursor-pointer"
              >
                Delete
              </div>
            </div>
            <p className="text-green-400 font-semibold mt-4">
              New <span className="text-white">2023</span>
            </p>
            <div className="flex flex-row mt-4 gap-2 items-center">
              <p className="text-white text-[10px] lg:text-sm">
                {data.duration}
              </p>
            </div>
            <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
              <p>{data.genre}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMovieCard;
