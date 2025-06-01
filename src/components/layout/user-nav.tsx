"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import { LogOut, User as UserIcon, PlusCircle, Settings, ShieldCheck } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet"; // For mobile nav logout

interface UserNavProps {
  isMobileSheet?: boolean;
}

export default function UserNav({ isMobileSheet = false }: UserNavProps) {
  const { user, logout, isAdmin } = useAuth();

  if (!user) {
    return null;
  }

  const getInitials = (name?: string) => {
    if (!name) return "U";
    const names = name.split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
  }

  const dropdownContent = (
    <>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none font-headline">{user.name || "User"}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {user.email}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center w-full cursor-pointer">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/characters/new" className="flex items-center w-full cursor-pointer">
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>New Character</span>
          </Link>
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link href="/admin/applications" className="flex items-center w-full cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Admin Panel</span>
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive-foreground focus:bg-destructive cursor-pointer">
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </>
  );
  
  if (isMobileSheet) {
    return (
      <div className="mt-auto pt-4">
        <div className="flex items-center space-x-3 mb-3 p-2 border-t border-border">
           <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatarUrl} alt={user.name || user.email} data-ai-hint="fantasy character"/>
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none font-headline">{user.name || "User"}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        <SheetClose asChild><Link href="/profile" className="flex items-center w-full rounded-md p-3 text-base hover:bg-accent hover:text-accent-foreground transition-colors"><UserIcon className="mr-2 h-5 w-5" />Profile</Link></SheetClose>
        {isAdmin && <SheetClose asChild><Link href="/admin/applications" className="flex items-center w-full rounded-md p-3 text-base hover:bg-accent hover:text-accent-foreground transition-colors"><Settings className="mr-2 h-5 w-5" />Admin Panel</Link></SheetClose>}
        <SheetClose asChild>
          <Button variant="ghost" onClick={logout} className="w-full justify-start p-3 text-base text-destructive hover:bg-destructive hover:text-destructive-foreground">
            <LogOut className="mr-2 h-5 w-5" />
            Log out
          </Button>
        </SheetClose>
      </div>
    );
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatarUrl} alt={user.name || user.email} data-ai-hint="fantasy character"/>
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {dropdownContent}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
