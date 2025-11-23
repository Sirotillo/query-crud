import { useGetUser } from "./service/query/useGetUser";
import { Card } from "../../components/card/card";
import { CardLoading } from "../../components/card/card-loading";
import { BackDrop } from "../../components/back-droup/back-drop";
import { CreateUser } from "../../components/form/form";

export const Home = () => {
  const { data, isLoading } = useGetUser();

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
            {data?.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-600">
                  No users found
                </h2>
                <p className="text-gray-500 mt-2">
                  There are no users to display at the moment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data?.map((item) => (
                  <Card key={item.id} {...item} />
                  
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
