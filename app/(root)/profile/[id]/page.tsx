import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/lib/actions/user.action";
import { SignedIn, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

const page = async ({ params: { id } }: Props) => {
  const { userId: clerkId } = auth();

  const userInfo = await getUserInfo({ userId: id });

  console.log(userInfo);

  return (
    <>
      {/* User Info */}
      <div className="flex flex-col justify-between sm:flex-row">
        <div className="flex flex-col gap-4 lg:flex-row">
          <Image
            src={userInfo.user.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="object-cover rounded-full"
          />

          <div className="flex flex-col gap-4">
            <h2 className="paragraph-semibold">{userInfo.user.name}</h2>
            <p>@{userInfo.user.username}</p>

            <div className="flex flex-wrap items-center max-md:items-start max-md:flex-col gap-2">
              <div className="flex items-center gap-1">
                <Image src="/assets/icons/link.svg" alt="portfolioWebsite" width={20} height={20} />
                <Link href={userInfo.user?.portfolioWebsite ?? "https://www.google.com"} className="text-sky-300">
                  {userInfo.user?.portfolioWebsite ?? "www.google.com"}
                </Link>
              </div>

              <div className="flex items-center gap-1">
                <Image src="/assets/icons/location.svg" alt="location" width={20} height={20} />
                <p>{userInfo.user?.location ?? "Taipei, Taiwan"}</p>
              </div>

              <div className="flex items-center gap-1">
                <Image src="/assets/icons/calendar.svg" alt="join" width={20} height={20} />
                <p>Joined {userInfo.user.joinAt.toString()}</p>
              </div>
            </div>

            {userInfo.user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {/* {userInfo.user.bio} */}
                Launch your development career with project-based coaching - showcase your skills with practical
                development experience and land the coding career of your dreams. Check out jsmastery.pro
              </p>
            )}
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === userInfo.user.clerkId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      {/* Stats */}
      <div className="border border-red-600 mt-4">
        <h3>Stats</h3>
        <div>Prizes</div>
      </div>

      {/* Questions & Top Tags */}
      <div className="flex flex-1 justify-between border-2 border-yellow-500 mt-4">
        {/* Questions */}
        <div className="border border-green-600">
          <div>Filter</div>
          <div>Answers</div>
          <div className="flex items-center justify-center">
            <Button className="primary-gradient text-white">Load More</Button>
          </div>
        </div>

        {/* Top Tags */}
        <div className="border border-indigo-500">
          <h3>Top Tags</h3>
          <div>tags</div>
        </div>
      </div>
    </>
  );
};

export default page;
