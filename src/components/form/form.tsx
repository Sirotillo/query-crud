import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateUser } from "../../pages/home/service/mutation/useCreateUser";
import { Spinner } from "../ui/spinner";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateUser } from "../../pages/home/service/mutation/useUpdateUser";
import { useDeleteUser } from "../../pages/home/service/mutation/useDeleteUser";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.email(),
});

interface DefaultValue {
  name?: string;
  email?: string;
  id?: number;
}

export const CreateUser = (defaultValue: DefaultValue) => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateUser();
  const { mutate: update, isPending: updateLoading } = useUpdateUser(
    defaultValue?.id as number
  );

  const client = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      ...defaultValue,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (defaultValue?.id) {
      update(data, {
        onSuccess: (res) => {
          client.setQueriesData(
            { queryKey: ["user_list"] },
            (oldData: DefaultValue[]) => {
              const result = oldData.map((item) =>
                item.id === defaultValue.id
                  ? { ...data, id: defaultValue.id }
                  : item
              );

              return result;
            }
          );
          form.reset();
          setOpen(false);
        },
        onError: (error) => {
          form.setError("name", { message: error.message });
        },
      });
    } else {
      mutate(data, {
        onSuccess: (res) => {
          client.invalidateQueries({ queryKey: ["user_list"] });
          form.reset();
          setOpen(false);
        },
        onError: (error) => {
          form.setError("name", { message: error.message });
        },
      });
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="mb-5 cursor-pointer">
        {defaultValue.id ? "Edit" : "Create"}
      </Button>
      <Dialog onOpenChange={(res) => setOpen(res)} open={open}>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {isPending || updateLoading ? <Spinner /> : ""}
                {defaultValue.id ? "Update" : "Submit"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
