import Link from "next/link";

import { Button } from "@/components/ui/button";

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

      <div className="mt-11 flex flex-col items-center justify-center gap-5">
        <div className="flex w-full items-center justify-between">
          <p className="border px-4 py-2">Local Searchbar</p>
          <p className="border px-4 py-2">Filters</p>
        </div>
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
              <h3 className="h3-bold">{article.title}</h3>
              <p>{article.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
