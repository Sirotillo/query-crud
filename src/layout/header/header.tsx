import React from "react";
import { Input } from "../../components/ui/input";
import { useSearch } from "../../service/useSearch";
import { useDebounce } from "@uidotdev/usehooks";
import { Spinner } from "../../components/ui/spinner";

export const Header = () => {
  const [input, setInput] = React.useState("");

  const value = useDebounce(input, 500);
  const { data, isLoading } = useSearch(value);

  return (
    <header className="p-5 bg-blue-400">
      <div className="container flex justify-end">
        <div className="relative">
          <Input
            className="w-[400px] bg-white"
            placeholder="Search"
            onChange={(e) => setInput(e.target.value.trim())}
          />
          {input ? (
            <div className="absolute bg-white rounded-2xl w-full p-2.5 shadow top-10">
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  {data?.length ? (
                    data?.map((item) => (
                      <div className="my-2" key={item.id}>
                        <h2 className="text-2xl">{item.name}</h2>
                      </div>
                    ))
                  ) : (
                    <h2>Not Found</h2>
                  )}
                </>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
};
