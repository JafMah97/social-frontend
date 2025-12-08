// hooks/useFakeMe.ts
import { useEffect, useState } from "react";

interface user {
  username: string;
  full_name: string;
  cover_image: string;
  profile_image: string;
  followers_count: number;
  following_count: number;
}

export default function useFakeMe() {
  const [data, setData] = useState<null | {user:user}>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // simulate API delay
    const timer = setTimeout(() => {
      // flip this flag to simulate error
      const simulateError = true;

      if (simulateError) {
        setIsError(true);
      } else {
        setData({
          user: {
            username: "jafar_dev",
            full_name: "Jafar Al‑Developer",
            cover_image: "/images/cover-placeholder.jpg",
            profile_image: "/images/profile-placeholder.jpg",
            followers_count: 123,
            following_count: 45,
          },
        });
      }
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading, isError };
}
