import { QueryClient, useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useDeleteUser = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/users/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
