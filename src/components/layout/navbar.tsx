"use client";

import Link from 'next/link';
import { Menu, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/auth-context';
import { siteConfig } from '@/config/site';
import type { NavItem } from '@/types';
import UserNav from './user-nav';
import { useIsMobile } from '@/hooks/use-mobile'; // Assuming useIsMobile hook exists or Tailwind classes are used

export default function Navbar() {
  const { user, loading } = useAuth();
  const isMobile = useIsMobile(); // Or use Tailwind's md:hidden, md:flex

  const renderNavLinks = (navItems: NavItem[], isMobileSheet: boolean = false) => (
    navItems.map((item) => {
      if (item.authRequired && !user) return null;
      if (item.adminRequired && user?.role !== 'admin') return null;
      if (item.publicOnly && user) return null;

      const linkContent = (
        <>
          {item.icon && <item.icon className={isMobileSheet ? "mr-2 h-5 w-5" : "mr-1 h-4 w-4"} />}
          {item.title}
        </>
      );
      
      const linkClass = isMobileSheet 
        ? "flex items-center w-full rounded-md p-3 text-base hover:bg-accent hover:text-accent-foreground transition-colors"
        : "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 flex items-center";

      if (isMobileSheet) {
        return (
          <SheetClose asChild key={item.href}>
            <Link href={item.href} className={linkClass}>
              {linkContent}
            </Link>
          </SheetClose>
        );
      }
      return (
        <Link href={item.href} key={item.href} className={linkClass}>
          {linkContent}
        </Link>
      );
    })
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 font-headline text-lg font-semibold text-primary">
          <Wand2 className="h-7 w-7 text-accent" />
          <span>{siteConfig.name}</span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {renderNavLinks(siteConfig.mainNav)}
            {user && (
              <Button asChild variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                <Link href="/characters/new">New Character</Link>
              </Button>
            )}
          </nav>
        )}
        
        <div className="flex items-center space-x-3">
          {!loading && !isMobile && (
            user ? (
              <UserNav />
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="outline" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/register">Register</Link>
                </Button>
              </div>
            )
          )}

          {/* Mobile Navigation Trigger */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[340px] bg-background p-6 flex flex-col">
                <Link href="/" className="mb-6 flex items-center space-x-2 font-headline text-lg font-semibold text-primary">
                   <Wand2 className="h-7 w-7 text-accent" />
                   <span>{siteConfig.name}</span>
                </Link>
                <nav className="flex flex-col space-y-2 flex-grow">
                  {renderNavLinks(siteConfig.mobileNavHeader, true)}
                  <hr className="my-3 border-border" />
                  {renderNavLinks(siteConfig.mobileNavFooter, true)}
                </nav>
                {!loading && user && (
                   <UserNav isMobileSheet={true} />
                )}
                {!loading && !user && isMobile && (
                  <div className="mt-auto pt-4 flex flex-col space-y-2">
                     <SheetClose asChild>
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/auth/login">Login</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild className="w-full">
                        <Link href="/auth/register">Register</Link>
                      </Button>
                    </SheetClose>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
