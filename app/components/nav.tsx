import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export const Nav: React.FC = () => {
  const links = [
    { name: "1C", link: `/?forum=1C` },
    { name: "IT", link: `/?forum=IT` },
    { name: "JOB", link: `/?forum=JOB` },
    { name: "LIFE", link: `/?forum=LIFE` },
    { name: "Настройки", link: "/options" },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/">React.Mista</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuList>
        {links.map((item) => (
          <NavigationMenuItem key={item.name}>
            <NavigationMenuLink asChild>
              <Link href={item.link}>{item.name}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>

      <NavigationMenuIndicator />
      <NavigationMenuViewport />
    </NavigationMenu>
  );
};
