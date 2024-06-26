import Image from "next/image";

import { formatAndDivideNumber } from "@/lib/utils";

interface StatsCardProps {
  imgUrl: string;
  value: number;
  title: string;
}

const StatsCard = ({ imgUrl, value, title }: StatsCardProps) => (
  <div className="flex flex-wrap items-center gap-4 p-6 rounded-md border ight-border background-light900_dark300 shadow-light-300 dark:shadow-dark-200">
    <Image src={imgUrl} alt={title} width={40} height={50} />
    <div>
      <p className="paragraph-semibold text-dark200_light900">{value}</p>
      <p className="body-medium text-dark400_light700">{title}</p>
    </div>
  </div>
);

interface Props {
  totalQuesitons: number;
  totalAnswers: number;
}

const Stats = ({ totalQuesitons, totalAnswers }: Props) => {
  return (
    <div className="mt-10">
      <h3 className="h3-semibold text-dark200_light900">Stats</h3>

      <div className="mt-4 grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-4">
        <div className="flex flex-wrap justify-evenly items-center gap-4 p-6 rounded-md border light-border background-light900_dark300 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark200_light900">{formatAndDivideNumber(totalQuesitons)}</p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">{formatAndDivideNumber(totalAnswers)}</p>
            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </div>

        <StatsCard imgUrl="/assets/icons/gold-medal.svg" value={15} title="Gold Badges" />

        <StatsCard imgUrl="/assets/icons/silver-medal.svg" value={23} title="Silver Badges" />

        <StatsCard imgUrl="/assets/icons/bronze-medal.svg" value={38} title="Bronze Badges" />
      </div>
    </div>
  );
};

export default Stats;
