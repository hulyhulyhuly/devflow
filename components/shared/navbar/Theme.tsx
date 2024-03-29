import Image from "next/image";

import { useTheme } from "@/context/ThemeProvider";
import { themes } from "@/constants";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

const Theme = () => {
  const { mode, setMode } = useTheme();

  const handleClickTheme = (value: string) => {
    setMode(value);
    if (value !== "system") {
      localStorage.theme = value;
    } else {
      localStorage.removeItem("theme");
    }
  };

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          <Image
            src={
              mode === "light"
                ? "/assets/icons/sun.svg"
                : "/assets/icons/moon.svg"
            }
            width={20}
            height={20}
            alt={`${mode === "light" ? "sun" : "moon"}`}
            className="active-theme"
          />
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] mt-3 min-w-[120px] rounded border bg-light-900 py-2 dark:border-dark-400 dark:bg-dark-300">
          {themes.map((theme) => (
            <MenubarItem
              key={theme.value}
              className="flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400"
              onClick={() => handleClickTheme(theme.value)}
            >
              <Image
                src={theme.icon}
                width={20}
                height={20}
                alt={`${theme.label}`}
                className={`${mode === theme.value && "active-theme"}`}
              />
              <p
                className={`body-semibold text-light-500
                  ${
                    mode === theme.value
                      ? "text-primary-500"
                      : "text-dark100_light900"
                  }
                `}
              >
                {theme.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
