import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface UserList {
  name: string;
  email: string;
  id: number;
}

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user_list"],
    queryFn: () => request.get<UserList[]>("/users").then((res) => res.data),
  });
};
