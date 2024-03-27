import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import Question from "@/components/form/Question";
import { getUserById } from "@/lib/actions/user.action";

const page = async () => {
  const { userId } = auth();

  // const userId = "123456789"; // mock ID

  if (!userId) {
    redirect("/sign-in");
  }

  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900 mb-4">
        Ask a public question
      </h1>

      <Question mongoUserId={JSON.stringify(mongoUser._id)} />
    </div>
  );
};

export default page;
