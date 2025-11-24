import { useQuery } from "@tanstack/react-query";
import { request } from "../config/request";

interface UserList {
  name: string;
  email: string;
  id: number;
}

export const useSearch = (str: string = "") => {
  return useQuery({
    queryKey: ["search_item", str],
    queryFn: async () => {
      console.log("Search term in hook:", str);

      const response = await request.get<UserList[]>("/users", {
        params: {
          name_like: str,
        },
      });

      return response.data;
    },
  });
};
