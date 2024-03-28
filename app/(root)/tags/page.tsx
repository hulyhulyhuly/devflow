import Link from "next/link";

import TagCard from "@/components/cards/TagCard";
import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { TagFilters } from "@/constants/filter";
import { getAllTags } from "@/lib/actions/tag.action";

const page = async () => {
  const tags = await getAllTags({});

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>

      <div className="flex w-full justify-between gap-4 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search by tag name here..."
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          innerClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-10 flex flex-wrap gap-6">
        {tags.length > 0 ? (
          tags.map((tag: any) => <TagCard key={tag._id} tag={tag} />)
        ) : (
          <div
            className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center
            "
          >
            <p>No tags yet</p>
            <Link
              href="/ask-question"
              className="mt-2 font-bold text-accent-blue"
            >
              Ask a question to be the first!
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default page;
