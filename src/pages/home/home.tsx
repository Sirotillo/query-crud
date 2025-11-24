import { BackDrop } from "../../components/back-droup/back-drop";
import { Card } from "../../components/card/card";
import { CardLoading } from "../../components/card/card-loading";
import { CreateUser } from "../../components/form/form";
import { useGetUser } from "./service/query/useGetUser";
import { Button } from "../../components/ui/button";
import { useSearchParams } from "react-router";

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || 1);

  const { data, isLoading } = useGetUser(page);
  const buttons = Array(data?.pageSize || 1).fill(null);
  searchParams.get("page");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <CreateUser />
        {isLoading ? (
          <>
            <CardLoading />
            <BackDrop />
          </>
        ) : (
          <div>
            {(data?.data?.length ?? 0) === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-600">
                  No users found
                </h2>
                <p className="text-gray-500 mt-2">
                  There are no users to display at the moment.
                </p>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {data?.data?.map((item) => (
                    <Card key={item.id} {...item} />
                  ))}
                </div>
                <div className="flex gap-2 items-center justify-center mt-2">
                  {buttons.map((_, index) => (
                    <Button
                      key={index}
                      onClick={() => setSearchParams({ page: `${index + 1}` })}
                      size={"icon"}
                      className={`cursor-pointer ${
                        index + 1 === page
                          ? "bg-blue-400 hover:bg-blue-200"
                          : ""
                      }`}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
