import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface UserList {
  name: string;
  email: string;
  id: number;
}

export const useGetUser = (page: number = 1, limit: number = 3) => {
  return useQuery({
    queryKey: ["user_list", page],
    queryFn: () =>
      request
        .get<UserList[]>("/users", {
          params: {
            _limit: limit,
            _page: page,
          },
        })
        .then((res): { data: UserList[]; pageSize: number } => {
          //@ts-ignore
          let allItems = res.headers.get("X-Total-Count");
          const pageSize = Math.ceil(Number(allItems) / 3);

          return { data: res.data, pageSize };
        }),
  });
};
