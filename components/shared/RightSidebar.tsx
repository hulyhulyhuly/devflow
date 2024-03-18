import Image from "next/image";

import RenderTag from "./RenderTag";

const hotQuestions = [
  { _id: 1, title: "How do I use express as a custom server in NextJS?" },
  { _id: 2, title: "Cascading Deletes in SQLAlchemy?" },
  { _id: 3, title: "How to Perfectly Center a Div with Tailwind CSS?" },
  {
    _id: 4,
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  },
  { _id: 5, title: "Redux Toolkit Not Updating State as Expected" },
];

const popularTags = [
  { _id: 1, name: "javascript", totalQuestions: 5 },
  { _id: 2, name: "react", totalQuestions: 5 },
  { _id: 3, name: "next", totalQuestions: 5 },
  { _id: 4, name: "vue", totalQuestions: 2 },
  { _id: 5, name: "redux", totalQuestions: 10 },
];

const RightSidebar = () => {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-[100svh] w-[350px] flex-col justify-between overflow-y-auto border-l px-6 pb-6 pt-36 shadow-light-300 dark:shadow-none max-lg:hidden">
      <div className="h-[50svh]">
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-4 flex flex-col gap-4">
          {hotQuestions.map((question) => (
            <div
              key={question._id}
              className="flex items-start justify-between"
            >
              <p className="text-dark200_light900 text-clip text-left">
                {question.title}
              </p>
              <Image
                src="/assets/icons/arrow-right.svg"
                width={20}
                height={20}
                alt="arrow-right"
                className="invert-colors"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="h-[50svh]">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-4 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
