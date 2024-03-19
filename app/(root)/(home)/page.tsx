import Link from "next/link";

import { Button } from "@/components/ui/button";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Filter from "@/components/shared/Filter";
import { HomePageFilters } from "@/constants/filter";
import HomeFilters from "@/components/home/HomeFilters";

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
          {[
            {
              _id: 1,
              title: "a",
              content: "abcdefg",
            },
            {
              _id: 2,
              title: "b",
              content: "abcdefg",
            },
            {
              _id: 3,
              title: "c",
              content: "abcdefg",
            },
          ].map((article) => (
            <div key={article._id} className="rounded-xl border px-4 py-2">
              <h3 className="h3-bold text-dark200_light900">{article.title}</h3>
              <p className="body-medium text-dark500_light700">
                {article.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
