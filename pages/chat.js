import Input from "@/components/Input";
import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useState } from "react";

const Chat = () => {
  const { data } = useCurrentUser();
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(data);
    try {
      const response = await axios.post("/api/send-message", {
        content: message,
        from: "user",
        userName: data.name,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center pt-10">
      <div className="max-w-md w-full space-y-2">
        <h1 className="text-white font-semibold text-xl">Chat</h1>
        <div className="border-2 border-white rounded-lg p-4"></div>
        <form onSubmit={submitHandler} className="flex items-stretch space-x-3">
          <Input
            id="message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            type="text"
            label="Message"
          />
          <button
            type="submit"
            className="bg-[#D91F27] text-white py-1.5 px-4 font-semibold text-xl rounded-md duration-300 hover:bg-transparent border-2 border-[#D91F27] hover:text-[#D91F27]"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
