import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import axios from "axios";

const MessageModal = ({ userData, closeHandler }) => {
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/send-message", {
        message,
        userName: userData.name,
        userEmail: userData.email,
      });
      closeHandler();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative mx-auto max-w-xl w-full rounded-md overflow-hidden">
        <div
          className={`transform duration-300 py-3 px-3 w-full relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div
            onClick={() => {
              closeHandler(false);
            }}
            className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
          >
            <XMarkIcon className="text-white w-6" />
          </div>
          <h1 className="text-white text-center font-semibold text-xl ">
            Message Admin
          </h1>
          <form onSubmit={submitHandler} className="space-y-2 my-4">
            <div className="relative w-full ">
              <textarea
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                value={message}
                id="message"
                type={"text"}
                className="block rounded-md h-40 px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peerinvalid:border-b-1"
                placeholder={"Enter your Message"}
              />
              <label
                id="message"
                className="absolute text-md text-zinc-400 duration-150  transform  -translate-y-3  scale-75  top-4  z-10  origin-[0]  left-6 peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:-translate-y-3"
              >
                Message
              </label>
            </div>
            <button
              type="submit"
              className="bg-[#D91F27] text-white py-1 w-full font-semibold text-xl rounded-md duration-300 hover:bg-transparent border-2 border-[#D91F27] hover:text-[#D91F27]"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
