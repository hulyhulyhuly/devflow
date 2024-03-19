import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";

interface Props {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}
const NotResult = ({ title, description, link, linkTitle }: Props) => {
  return (
    <div className="mt-10 flex h-[395px] w-full flex-col items-center justify-center gap-4">
      <Image
        src="/assets/images/light-illustration.png"
        width={270}
        height={200}
        alt="not-result-illustration"
        className="block object-contain dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        width={270}
        height={200}
        alt="not-result-illustration"
        className="hidden object-contain dark:block"
      />
      <h2 className="h3-bold text-dark200_light900">{title}</h2>
      <p className="body-regular text-dark500_light700 max-w-md text-center">
        {description}
      </p>

      <Link href={link}>
        <Button className="paragraph-medium mt-5 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
          {linkTitle}
        </Button>
      </Link>
    </div>
  );
};

export default NotResult;
