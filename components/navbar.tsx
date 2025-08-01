"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Menu, School } from "lucide-react";
import DarkMode from "./darkmode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="w-full dark:bg-[#4e4848] bg-white flex h-14 border-b dark:border-gray-800 border-b-gray-300 fixed top-0 left-0 right-0 z-10 duration-300">

      {/* Desktop Nav */}
      <div className="hidden md:flex max-w-7xl w-full mx-auto px-4 md:px-6 justify-between items-center h-full ">
        <div className="flex items-center gap-2">
          <School />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            SkillNest
          </h1>
        </div>
        <div className="flex items-center gap-6">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar aria-label="User menu">
                  <AvatarImage
                    src={session.user.image ?? "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>
                    {session.user.name?.[0] ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/signup">Sign In</Link>
            </Button>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="flex md:hidden w-full items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <School className="h-6 w-6 text-gray-800 dark:text-white" />
          <h1 className="text-lg font-bold text-gray-800 dark:text-white">
            SkillNest
          </h1>
        </div>
        <MobileNavBar  />
      </div>
    </div>
  );
}

const MobileNavBar = () => {
    const { data: session } = useSession();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full shadow-sm bg-gray-100 hover:bg-gray-200 border-gray-300 dark:border-gray-700">
          <Menu className="h-5 w-5 font-semibold" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-72 p-5 space-y-6">
        <SheetHeader className="flex flex-row items-center justify-between mb-2">
          <SheetTitle className="text-lg font-semibold text-gray-800 dark:text-white">Menu</SheetTitle>
          <DarkMode />
        </SheetHeader>

        <Separator className="mb-2" />

        <nav className="flex flex-col space-y-3">
          <span className="text-sm  font-semibold hover:text-primary cursor-pointer transition-colors">My Space</span>
          <span className="text-sm font-semibold hover:text-primary cursor-pointer transition-colors">Edit Profile</span>
          <span className="text-sm font-semibold hover:text-primary cursor-pointer transition-colors">Settings</span>
          
          <Button variant="outline" className="w-full" onClick={() => signOut()}>
            <Link href="/signup" className="w-full text-center">
              Log Out
            </Link>
          </Button>
        </nav>

        {typeof session?.user.role === "string" && session.user.role.includes("teacher") && (
          <SheetFooter className="mt-4">
            <Button  asChild>
              <Link href="/teacher/dashboard">Teacher Dashboard {session.user.role}</Link>
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};


