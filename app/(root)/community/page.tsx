import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import NotResult from "@/components/shared/NotResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filter";
import { getAllUser } from "@/lib/actions/user.action";

const page = async () => {
  const allUser = await getAllUser({});

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 flex flex-col items-start justify-center gap-5">
        <div className="flex w-full justify-between gap-4 max-sm:flex-col sm:items-center">
          <LocalSearchbar
            route="/"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search amazing minds here..."
            otherClasses="flex-1"
          />
          <Filter
            filters={UserFilters}
            innerClasses="min-h-[56px] sm:min-w-[170px]"
          />
        </div>

        <div className="flex w-full flex-col gap-6">
          {allUser.length > 0 ? (
            allUser.map((user: any) => (
              <UserCard
                key={user._id}
                _id={user.id}
                tags={[{ _id: "1", name: "YO" }]}
                author={user}
              />
            ))
          ) : (
            <NotResult
              title="There’s no question to show"
              description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
              link="/ask-question"
              linkTitle="Ask a Question"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default page;
