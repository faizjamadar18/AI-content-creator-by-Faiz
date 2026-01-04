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
import {  DM_Sans } from "next/font/google";

const dm_Sans = DM_Sans({ subsets: ["latin"] });
const Header = () => {
    const { isLoading, isAuthenticated } = useStoreUser()
    const path = usePathname()
    const router = useRouter()

    // useEffect(() => {
    //     if (!isLoading && isAuthenticated && path === "/feed") {
    //         router.push("/sign-in")
    //     }
    // }, [isLoading, isAuthenticated, router, path])  


    if (path !== "/" && path !== "/feed" && path !== "/sign-in" && path !== "/sign-up") { // this means show header only on "/" and "/feed"
        return null;
    }

    return (
        <header className='fixed top-0 left-0 right-0 z-50 w-full px-24 sm:px-6 lg:px-8 py-4 bg-neutral-950/50 '>
            <div className="max-w-7xl mx-auto flex items-center justify-between px-24">

                <Link href="/" className='flex items-center gap-2 flex-shrink-0'>
                    {/* <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-black font-bold text-lg">F</span>
                    </div> */}
                    <span className={`sm:text-2xl text-lg font-bold ${dm_Sans.className}`}>
                        Faizbook.ai
                    </span>
                </Link>
                {/* {path === "/" && (
                    <nav className="hidden md:flex items-center gap-6 flex-1 justify-center mr-10">
                        <Link
                            href="#home"
                            className="text-white text-sm font-black transition-colors duration-200 hover:text-purple-300"
                        >Home</Link>
                        <Link
                            href="#vision"
                            className="text-white text-sm font-black transition-colors duration-200 hover:text-purple-300"
                        >
                            Vision
                        </Link>
                        <Link
                            href="#suite"
                            className="text-white text-sm font-black transition-colors duration-200 hover:text-purple-300"
                        >
                            Toolkit
                        </Link>
                        <Link
                            href="#workflow"
                            className="text-white text-sm font-black transition-colors duration-200 hover:text-purple-300"
                        >
                            Flow
                        </Link>
                        <Link
                            href="#proof"
                            className="text-white text-sm font-black transition-colors duration-200 hover:text-purple-300"
                        >
                            Proofs
                        </Link>
                        <Link
                            href="#create"
                            className="text-white text-sm font-black transition-colors duration-200 hover:text-purple-300"
                        >
                            Create
                        </Link>
                    </nav>
                )} */}

                {/* Buttons on right */}
                <div className="flex items-center justify-center gap-3 flex-shrink-0">
                    {/* when logged in:  */}
                    <Authenticated>
                        {/* Show Dashboard link on feed page */}
                        <Link href="/dashboard">
                            <Button variant="outline" className="flex rounded-full border border-white/20 bg-white/10 hover:bg-white/20" size="sm">
                                <LayoutDashboard className="h-4 w-4" />
                                <span className="hidden md:inline ml-2">Dashboard</span>
                            </Button>
                        </Link>

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

                {/* {true && (
                    <div className="fixed top-15 left-0 w-full z-40 flex justify-center">
                        <BarLoader width={"95%"} color="#D8B4FE" />
                    </div>
                )}  */}
            </div>
        </header>
    )
}

export default Header
