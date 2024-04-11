"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SignedOut, useAuth } from "@clerk/nextjs";

import { sidebarLinks } from "@/constants";
import { Button } from "../ui/button";

const LeftSidebar = () => {
  const pathName = usePathname();

  const { userId } = useAuth();

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-[100svh] flex-col justify-between overflow-y-auto border-r px-6 pb-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive = pathName === item.route || (pathName.includes(item.route) && item.route.length > 1);

          if (item.route === "/profile") {
            if (userId) {
              item.route = `${item.route}/${userId}`;
            } else {
              return null;
            }
          }
          return (
            <Link
              key={item.label}
              href={item.route}
              className={`flex items-center gap-4 bg-transparent p-4 ${
                isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900"
              }`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`max-lg:hidden ${isActive ? "base-bold" : "base-medium"}`}>{item.label}</p>
            </Link>
          );
        })}
      </div>

      <SignedOut>
        <div className="flex flex-col gap-4">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[42px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">Log In</span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[42px] w-full rounded-lg border px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="sign_up"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Sign Up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
