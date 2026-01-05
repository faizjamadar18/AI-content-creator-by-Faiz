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
        <header className='sticky top-0 inset-x-0 h-14 md:px-32 px-1 w-full z-50 py-4 bg-neutral-950/50 backdrop-blur-xl'>
            <div className="flex items-center justify-between md:px-12 px-3">
                <div className='flex gap-16'>
                    

                <Link href="/" className='flex items-center gap-2 flex-shrink-0'>
                    {/* <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-black font-bold text-lg">F</span>
                    </div> */}
                    <span className={`text-xl font-black ${dm_Sans.className}`}>
                        Faizbook.ai
                    </span>
                </Link>
                {path === "/" && (
                    <nav className="hidden md:flex items-center gap-6 flex-1 justify-center mr-10">
                        <Link
                            href="#features"
                            className="text-neutral-500 font-bold text-sm hover:text-neutral-400"
                        >Features</Link>
                        <Link
                            href="#process"
                            className="text-neutral-500 font-bold text-sm hover:text-neutral-400"
                        >
                            Process
                        </Link>
                        <Link
                            href="#testomonials"
                            className="text-neutral-500 font-bold text-sm hover:text-neutral-400"
                        >
                            Testomonials
                        </Link>
                        <Link
                            href="#create"
                            className="text-neutral-500 font-bold text-sm hover:text-neutral-400"
                        >
                            Create
                        </Link>
                    </nav>
                )}
                </div>
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
                        <SignInButton>
                            <Button variant={"none"} className=" text-white text-sm font-medium transition-all duration-300 hover:text-neutral-300 hidden md:block" size="sm">
                                Sign In
                            </Button>
                        </SignInButton>
                        <SignUpButton>
                            <Button variant='md:primary' className="border border-white/20 bg-black hover:bg-white/20 text-white whitespace-nowrap" size="sm">
                                Get started
                            </Button>
                        </SignUpButton>
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
