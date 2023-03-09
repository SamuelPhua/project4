import useCurrentUser from "@/hooks/useCurrentUser";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

const images = [
  "/images/default-blue.png",
  "/images/default-red.png",
  "/images/default-slate.png",
  "/images/default-green.png",
];

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

const Profile = () => {
  const router = useRouter();
  const imgSrc = images[Math.floor(Math.random() * 3)];

  const { data } = useCurrentUser();

  if (!data)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <h1>Loading ...</h1>
      </div>
    );

  const clickHandler = () => {
    router.push(data.userType === "admin" ? "/admin" : "/");
  };
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who&#39;s watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div
            onClick={() => {
              clickHandler();
            }}
          >
            <div className="group flex-row w-44 mx-auto">
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <Image
                  src={imgSrc}
                  alt={"profile image"}
                  width={250}
                  height={250}
                />
              </div>
              <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                {data?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
