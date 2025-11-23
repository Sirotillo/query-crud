import { useMutation } from "@tanstack/react-query";
import React from "react";
import { request } from "../../../../config/request";

interface User {
  name: string;
  email: string;
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (data: User) =>
      request.post("/users", data).then((res) => res.data),
  });
};
