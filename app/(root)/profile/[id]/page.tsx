import Image from "next/image";
import Link from "next/link";
import { SignedIn, auth } from "@clerk/nextjs";

import AnswerTab from "@/components/shared/AnswerTab";
import ProfileLink from "@/components/shared/ProfileLink";
import QuestionTab from "@/components/shared/QuestionTab";
import Stats from "@/components/shared/Stats";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserInfo } from "@/lib/actions/user.action";
import { getJoinedDate } from "@/lib/utils";

interface Props {
  params: {
    id: string;
  };
}

const page = async ({ params: { id } }: Props) => {
  const { userId: clerkId } = auth();

  const userInfo = await getUserInfo({ userId: id });

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

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{userInfo.user.name}</h2>
            <p className="paragraph-regular text-dark200_light800">@{userInfo.user.username}</p>

            <div className="flex flex-wrap items-center max-md:items-start max-md:flex-col gap-2">
              {userInfo.user.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={"https://www.google.com"}
                  title={"https://www.google.com"}
                />
              )}

              {userInfo.user.location && (
                <ProfileLink imgUrl="/assets/icons/location.svg" title={userInfo.user.location ?? "Taipei, Taiwan"} />
              )}

              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={`Joined ${getJoinedDate(userInfo.user.joinAt)}`}
              />
            </div>

            {userInfo.user.bio && <p className="paragraph-regular text-dark400_light800 mt-8">{userInfo.user.bio}</p>}
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3 max-sm:justify-start max-sm:mt-5">
          <SignedIn>
            {clerkId === userInfo.user.clerkId && (
              <Link href={`/profile/${id}/edit`}>
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      {/* Stats */}
      <Stats totalQuesitons={userInfo.stats.totalQuesitons} totalAnswers={userInfo.stats.totalQuesitons} />

      {/* Top Posts & Answers / Top Tags */}
      <div className="flex flex-1 justify-between mt-4">
        {/* Top Posts & Answers */}
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>

          {/* Top Posts (question by user) */}
          <TabsContent value="top-posts">
            <QuestionTab userId={userInfo.user._id} clerkId={clerkId} />
          </TabsContent>

          {/* Answers */}
          <TabsContent value="answers">
            <AnswerTab userId={userInfo.user._id} clerkId={clerkId} />
          </TabsContent>
        </Tabs>

        {/* Top Tags */}
        <div className="border border-indigo-500 max-sm:hidden">
          <h3>Top Tags</h3>
          <div>tags</div>
        </div>
      </div>
    </>
  );
};

export default page;
