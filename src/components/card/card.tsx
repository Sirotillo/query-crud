import { useQueryClient } from "@tanstack/react-query";
import { CreateUser } from "../form/form";
import { Button } from "../ui/button";
import { useDeleteUser } from "../../pages/home/service/mutation/useDeleteUser";

interface UserList {
  name: string;
  email: string;
  id: number;
}

export const Card = ({ name, email, id }: UserList) => {
  const { mutate: deleteUser, isPending: deleteLoading } = useDeleteUser();
  const client = useQueryClient();

  const handleDelete = (userId: number, userName: string) => {
    if (
      window.confirm(`"${userName}" foydalanuvchisini o'chirishni istaysizmi?`)
    ) {
      deleteUser(userId, {
        onSuccess: () => {
          client.invalidateQueries({ queryKey: ["user_list"] });
        },
      });
    }
  };
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all duration-200 hover:shadow-lg">
      <h2 className="mb-2 text-xl font-bold text-gray-800">{name}</h2>
      <p className="text-gray-600">{email}</p>
      <CreateUser email={email} name={name} id={id} />
      <Button
        variant="destructive"
        size="sm"
        onClick={() => handleDelete(id, name)}
        disabled={deleteLoading}
        className="text-xs"
      >
        {deleteLoading ? "..." : "Delete"}
      </Button>
    </div>
  );
};
