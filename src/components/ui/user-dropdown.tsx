import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { User, UserCircle2 } from "lucide-react";
import useAuthStore from "@/stores/authStore";
import Link from "next/link";

const UserDropdown = () => {
  const { user, logout, setUser } = useAuthStore();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar
            title="User Actions"
            className="bg-white flex items-center justify-center"
          >
            {/* <AvatarImage src="/user.png" /> */}
            <User color="black" size={30} />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/my-bookings">My Bookings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/my-orders">My Orders</Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserDropdown;
