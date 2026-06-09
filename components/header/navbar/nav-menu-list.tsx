"use client";
import { type ComponentProps } from "react";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";

type IProps = ComponentProps<typeof NavigationMenuList>;

export const NavMenuList: React.FC<IProps> = (props) => {
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
          <ThemeSwitcher className="text-foreground" />
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
};
