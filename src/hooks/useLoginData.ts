import { useEffect, useState } from "react";
import { loginDetails } from "../api/services/authService";

interface LoginData {
  name: string;
  photo: string;
  lastLogin: string;
  loading: boolean;
  error: string | null;
}

export function useLoginData(): LoginData {
  const [data, setData] = useState<LoginData>({
    name: "",
    photo: "",
    lastLogin: "",
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchLogin = async () => {
      try {
        const response = await loginDetails();
        console.log("response: ", response);

        setData({
          name: response.DirectorDetails[0]?.Name ?? "",
          photo: response.DirectorDetails[1]?.Photo ?? "",
          lastLogin: response.DirectorDetails[2]?.Date ?? "",
          loading: false,
          error: null,
        });
      } catch {
        setData((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to fetch login data",
        }));
      }
    };

    fetchLogin();
  }, []);

  return data;
}
