import Link from "next/link";

import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filter";
import { getAllUsers } from "@/lib/actions/user.action";

const page = async () => {
  const allUser = await getAllUsers({});

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
          <Filter filters={UserFilters} innerClasses="min-h-[56px] sm:min-w-[170px]" />
        </div>

        <div className="flex w-full gap-6">
          {allUser.length > 0 ? (
            allUser.map((user: any) => <UserCard key={user._id} user={user} />)
          ) : (
            <div
              className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center
            "
            >
              <p>No users yet</p>
              <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
                Join to be the first!
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
