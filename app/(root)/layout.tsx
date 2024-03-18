"use client";

import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Navbar from "@/components/shared/navbar/Navbar";
import { useTheme } from "@/context/ThemeProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { mode, setMode } = useTheme();

  return (
    <main className="background-light850_dark100 relative">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <p className="dark:text-white">Theme Mode: {mode}</p>
          <br />
          <button
            className="h-12 w-20 rounded-xl bg-orange-400 hover:bg-orange-600 dark:bg-orange-600 dark:text-white dark:hover:bg-orange-400"
            onClick={() => {
              if (mode === "light") {
                setMode("dark");
                localStorage.theme = "dark";
              } else {
                setMode("light");
                localStorage.theme = "light";
              }
            }}
          >
            change
          </button>
          <br />
          <div className="mx-auto w-full max-w-5xl bg-pink-300">{children}</div>
        </section>
        <RightSidebar />
      </div>
      Toaster
    </main>
  );
};

export default Layout;
