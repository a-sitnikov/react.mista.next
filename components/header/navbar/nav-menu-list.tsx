"use client";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuListProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";

interface IProps extends NavigationMenuListProps {
  onClick?: () => void;
}

export const NavMenuList: React.FC<IProps> = ({ onClick, ...props }) => {
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
            <Link href={item.link} onClick={onClick}>
              {item.name}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  );
};
