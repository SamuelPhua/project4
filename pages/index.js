import Billboards from "@/components/Billboards";
import InfoModal from "@/components/InfoModal";
import MessageModal from "@/components/MessageModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import useMovies from "@/hooks/useMovieList";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

export default function Home() {
  const { data } = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (data) {
      if (data.userType === "admin") {
        router.push("/admin");
      }
    }
  }, [data, router]);
  const { data: TrendingMovies = [] } = useMovies();
  const { data: FavoriteMovies = [] } = useFavorites();

  const { isOpen, closeModal } = useInfoModalStore();

  const [showMessageModal, setShowMessageModal] = useState(false);
  return (
    <div>
      {showMessageModal && (
        <MessageModal userData={data} closeHandler={setShowMessageModal} />
      )}
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboards />
      <div className="pb-40">
        {TrendingMovies && (
          <div>
            <MovieList title="Trending Now" data={TrendingMovies} />
            <MovieList title="My List" data={FavoriteMovies} />
          </div>
        )}
      </div>

      <div className="flex items-center justify-center py-5">
        <button
          onClick={() => {
            setShowMessageModal(true);
          }}
          className="bg-[#D91F27] text-white py-1 px-6 font-semibold text-xl rounded-md duration-300 hover:bg-transparent border-2 border-[#D91F27] hover:text-[#D91F27]"
        >
          Message Admin
        </button>
      </div>
    </div>
  );
}
