import useSwr from "swr";
import fetcher from "@/lib/fetcher";

const useMessages = () => {
  const { data, error, isLoading, mutate } = useSwr("/api/messages", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useMessages;
