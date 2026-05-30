"use client";
import { type ComponentProps } from "react";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";

interface IProps extends ComponentProps<typeof NavigationMenuList> {
  isDarkTheme: boolean;
}

export const NavMenuList: React.FC<IProps> = ({ isDarkTheme, ...props }) => {
  const links = [
    { name: "1C", link: `/?forum=1C` },
    { name: "IT", link: `/?forum=IT` },
    { name: "JOB", link: `/?forum=JOB` },
    { name: "LIFE", link: `/?forum=LIFE` },
    { name: "Настройки", link: "/options" },
  ];

  return (
    <NavigationMenuList {...props}>
      {links.map((item) => (
        <NavigationMenuItem key={item.name}>
          <NavigationMenuLink asChild>
            <Link href={item.link} className="text-foreground" prefetch={false}>
              {item.name}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <ThemeSwitcher
            className="text-foreground"
            isDarkTheme={isDarkTheme}
          />
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
};
