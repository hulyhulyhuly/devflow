import Image from "next/image";
import Link from "next/link";

import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import RenderTag from "@/components/shared/RenderTag";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";

const questions = [
  {
    _id: "1",
    title: "Cascading Deletes in SQLAlchemy?",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "sql" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      picture: "john-doe.jpg",
    },
    upvotes: 1500000,
    views: 500552,
    answers: 10,
    // answers: [],
    createdAt: new Date("2023-09-01T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "How to center a div?",
    tags: [
      { _id: "3", name: "css" },
      { _id: "4", name: "html" },
    ],
    author: {
      _id: "2",
      name: "Jane Smith",
      picture: "jane-smith.jpg",
    },
    upvotes: 5,
    views: 50,
    answers: 3,
    // answers: [],
    createdAt: new Date("2021-09-02T10:30:00.000Z"),
  },
];

const Home = () => {
  return (
    <>
      <div className="flex w-full justify-between gap-4 max-sm:flex-col-reverse">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex flex-col items-start justify-center gap-5">
        <div className="flex w-full items-center justify-between gap-4 max-sm:flex-col">
          <LocalSearchbar
            route="/"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search for questions"
            otherClasses="flex-1"
          />
          <Filter filters={HomePageFilters} />
        </div>

        <HomeFilters />

        <div className="flex w-full flex-col gap-6">
          {questions.map((question) => (
            <div key={question._id} className="rounded-xl border px-4 py-2">
              <h3 className="h3-bold text-dark200_light900">
                {question.title}
              </h3>

              <div className="my-6 flex gap-4">
                {question.tags.map((tag) => (
                  <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src="/assets/icons/avatar.svg"
                    alt="author"
                    width={20}
                    height={20}
                    className="invert-colors overflow-auto rounded-full object-cover"
                  />
                  <p>{question.author.name}</p>
                  <span>·</span>
                  <p className="text-sm font-thin">
                    asked&nbsp;
                    {Math.round(
                      (Date.now() - question.createdAt.getTime()) /
                        (1000 * 3600 * 24)
                    )}
                    days ago
                  </p>
                </div>

                <div className="flex items-center justify-evenly gap-4">
                  <div className="flex items-center gap-1">
                    <Image
                      src="/assets/icons/like.svg"
                      width={16}
                      height={16}
                      alt="vote"
                    />
                    <p>{question.upvotes} Votes</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Image
                      src="/assets/icons/message.svg"
                      width={16}
                      height={16}
                      alt="vote"
                    />
                    <p>{question.answers} Answers</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Image
                      src="/assets/icons/eye.svg"
                      width={16}
                      height={16}
                      alt="vote"
                    />
                    <p>{question.views} Views</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
