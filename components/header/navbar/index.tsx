"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NavMenuList } from "./nav-menu-list";
import { NavigationMenu } from "@/components/ui/navigation-menu";

interface IProps {
  isDarkTheme: boolean;
}

export const NavBar: React.FC<IProps> = ({ isDarkTheme }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-foreground">
          React.Mista
        </Link>
        {/* Desktop NavigationMenu */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavMenuList isDarkTheme={isDarkTheme} />
          </NavigationMenu>
        </div>
        {/* Mobile burger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      {/* Mobile slide-down menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col space-y-4 px-4 py-4 text-lg border-t">
          <NavigationMenu orientation="vertical">
            <NavMenuList
              onClick={() => setOpen(false)}
              className="flex flex-col space-y-3"
              isDarkTheme={isDarkTheme}
            />
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
};
