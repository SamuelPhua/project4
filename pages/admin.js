import AdminMovieCard from "@/components/AdminMovieCard";
import FormModal from "@/components/FormModal";
import Navbar from "@/components/Navbar";
import useMovies from "@/hooks/useMovieList";
import { useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Billboards from "@/components/Billboards";

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

const Admin = () => {
  const router = useRouter();
  const { data, mutate } = useMovies();
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <Navbar />

      <Billboards />

      {showForm && <FormModal setShowForm={setShowForm} />}
      <div className="flex pt-20 px-4 justify-center h-screen ">
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-xl ">Movies</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setShowForm(true);
                }}
                className="bg-[#D91F27] text-white py-1 px-6 font-semibold text-xl rounded-md duration-300 hover:bg-transparent border-2 border-[#D91F27] hover:text-[#D91F27]"
              >
                Add Movie
              </button>
              <button
                onClick={() => {
                  router.push("/messages");
                }}
                className="bg-[#D91F27] text-white py-1 px-6 font-semibold text-xl rounded-md duration-300 hover:bg-transparent border-2 border-[#D91F27] hover:text-[#D91F27]"
              >
                Messages
              </button>
            </div>
          </div>
          <div className="grid gap-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {data?.map((movieData) => (
              <AdminMovieCard
                mutate={mutate}
                key={movieData.id}
                data={movieData}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
