import Navbar from "@/components/Navbar";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import useMessages from "@/hooks/useMessages";
import axios from "axios";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
const Messages = () => {
  const router = useRouter();
  const { data, mutate } = useMessages();

  const handleDelete = async (messageId) => {
    try {
      await axios.delete(`/api/message/${messageId}`);
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="pt-20 space-y-6">
        <div className="flex items-center justify-center space-x-6">
          <ArrowLeftIcon
            onClick={() => router.back()}
            className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition"
          />
          <h1
            className="text-center text-white font-bold text-3xl
          "
          >
            Messages
          </h1>
        </div>
        <div className="max-w-md w-full mx-auto">
          {data?.map((msg) => (
            <div
              key={msg.id}
              className={
                "rounded-lg p-4 w-full border border-slate-700 flex items-center justify-between"
              }
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-lime-600 text-white flex items-center justify-center font-bold text-xl">
                  <span>{msg.userName.slice(0, 1).toUpperCase()}</span>:
                </div>
                <div>
                  <h6 className="text-medium text-white">{msg.userEmail}</h6>
                  <h2 className="font-bold text-white">{msg.message}</h2>
                </div>
              </div>
              <button
                onClick={() => {
                  handleDelete(msg.id);
                }}
                className="text-[#D91F27] font-semibold text-lg cursor-pointer"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
