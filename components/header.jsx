"use client"
import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from 'convex/react';
import { useStoreUser } from '@/hooks/use-store-user';
import { BarLoader } from 'react-spinners';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { LayoutDashboard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Header = () => {
    const { isLoading, isAuthenticated } = useStoreUser()
    const path = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && isAuthenticated && path === "/") {
            router.push("/feed")
        }
    }, [isLoading, isAuthenticated, router, path])  // jo jo dikh raha hai upr voh sb

    const gradientText =
        "bg-gradient-to-r from-[#FAD961] via-[#F76B1C] to-[#845EF3] bg-clip-text text-transparent";

    if (path !== "/" && path !== "/feed") { // this means show header only on "/" and "/feed"
        return null;
    }

    return (
        <header className='fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-4 bg-black/50'>
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                {/* Logo on left */}
                <Link href={isAuthenticated ? "/feed" : "/"} className='flex items-center gap-3 flex-shrink-0'>
                    <span className={`block sm:text-2xl text-xl font-black ${gradientText}`}>
                        Faizbook.in
                    </span>
                </Link>

                {/* Navigation links in center */}
                {path === "/" && (
                    <nav className="hidden md:flex items-center gap-6 flex-1 justify-center mr-10">
                        <Link
                            href="#vision"
                            className="text-white text-sm font-black  transition-all duration-300 hover:text-purple-300"
                        >
                            Vision
                        </Link>
                        <Link
                            href="#suite"
                            className="text-white text-sm font-black  transition-all duration-300 hover:text-purple-300"
                        >
                            Creator suite
                        </Link>
                        <Link
                            href="#workflow"
                            className="text-white text-sm font-black  transition-all duration-300 hover:text-purple-300"
                        >
                            Flow
                        </Link>
                        <Link
                            href="#proof"
                            className="text-white text-sm font-black  transition-all duration-300 hover:text-purple-300"
                        >
                            Proof
                        </Link>
                    </nav>
                )}

                {/* Buttons on right */}
                <div className="flex items-center justify-center gap-3 flex-shrink-0">
                    {/* when logged in:  */}
                    <Authenticated>
                        {/* Show Dashboard link on feed page */}
                        {path === "/feed" && (
                            <Link href="/dashboard">
                                <Button variant="outline" className="flex rounded-full border border-white/20 bg-white/10 hover:bg-white/20" size="sm">
                                    <LayoutDashboard className="h-4 w-4" />
                                    <span className="hidden md:inline ml-2">Dashboard</span>
                                </Button>
                            </Link>
                        )}
                        <UserButton />
                    </Authenticated>

                    {/* when logged out:  */}
                    <Unauthenticated>
                        {/* <SignInButton>
                            <Button variant={"none"} className=" text-white text-sm font-medium transition-all duration-300 hover:text-purple-300" size="sm">
                                Sign In
                            </Button>
                        </SignInButton> */}
                        <SignInButton>
                            <Button className="border border-white/20 bg-black hover:bg-white/20 text-white whitespace-nowrap" size="sm">
                                Get started
                            </Button>
                        </SignInButton>
                    </Unauthenticated>
                </div>

                {/* {isLoading && (
                    <div className="fixed top-15 left-0 w-full z-40 flex justify-center">
                        <BarLoader width={"95%"} color="#D8B4FE" />
                    </div>
                )}  */}
            </div>
        </header>
    )
}

export default Header
