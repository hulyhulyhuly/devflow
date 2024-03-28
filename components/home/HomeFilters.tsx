"use client";

import { useState } from "react";

import { HomePageFilters } from "@/constants/filter";
import { Button } from "../ui/button";

const HomeFilters = () => {
  const [filter, setFilter] = useState("newest");

  return (
    <div className="mt-10 flex flex-wrap items-center gap-4 max-md:hidden">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => setFilter(item.value)}
          className={`body-medium cursor-pointer rounded-lg bg-blue-100 px-6 py-3 capitalize shadow-none ${
            filter === item.value
              ? "bg-primary-100 text-primary-500"
              : "bg-light-800 text-light-500"
          }`}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
