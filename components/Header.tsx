"use client";
import {
  Briefcase,
  HomeIcon,
  MessagesSquare,
  SearchIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import LogoutButton from "./LogoutButton";


function Header() {
  return (
    <div className="flex items-center p-2 max-w-6xl mx-auto ">
      <Image
        src="https://links.papareact.com/b3z"
        alt="Logo"
        width={40}
        height={40}
      />

      <div className="flex-1">
        <form className="flex flex-1 items-center space-x-1 bg-gray-100 rounded-full mx-2 max-w-96">
          <SearchIcon className="h-4 text-gray-600" />
          <input
            type="text"
            placeholder="Start your search"
            className="pl-2 bg-transparent flex-1 py-2 outline-none"
          />
        </form>
      </div>

      <div className="flex items-center space-x-4 px-6">
        <Link href="/" className="icon">
          <HomeIcon className="h-6" />
          <p>Home</p>
        </Link>

        <Link href="/network" className="icon hidden md:flex">
          <UsersIcon className="h-6" />
          <p>My Network</p>
        </Link>

        <Link href="/jobs" className="icon hidden md:flex">
          <Briefcase className="h-6" />
          <p>Jobs</p>
        </Link>

        <Link href="/messages" className="icon ">
          <MessagesSquare className="h-6" />
          <p>Jobs</p>
        </Link>



          <LogoutButton  />

      </div>
    </div>
  );
}

export default Header;
