"use client"

import { FileText, Ghost, LayoutDashboard, Menu, PenTool, Settings, User, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { UserButton } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import { useConvexQuery } from '@/hooks/use-convex-query-mutation'
import { api } from '@/convex/_generated/api'



const DashboardLayout = ({ children }) => {

    const { data: user, isLoading } = useConvexQuery(api.users.getCurrentUser)

    const [isSidebarOpen, setisSidebarOpen] = useState(false)
    const toggleSidebar = () => {
        setisSidebarOpen(!isSidebarOpen)
    }
    const pathname = usePathname()
    const { data: draftPost } = useConvexQuery(api.posts.getUserDraft);

    const sidebarItems = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard
        },
        {
            title: "Create Post",
            href: "/dashboard/create",
            icon: PenTool
        },
        {
            title: "My Posts",
            href: "/dashboard/posts",
            icon: FileText
        },
        {
            title: "Profile",
            href: user ? `/${user.username}` : "/dashboard/posts", // to avoid isActive at very beginning 
            icon: User
        }
    ]

    return (
        <div>

            <aside className={cn("fixed top-0 left-0 h-full w-64 bg-slate-800/50 backdrop-blur-sm border-r border-slate-700 z-50 transition-transform duration-300 lg:translate-x-0", isSidebarOpen ? "translate-x-0" : "-translate-x-full")}>
                <div className='flex items-center justify-between p-5 border-b border-slate-700'>
                    <Link href={"/"}>
                        <Image
                            src={"/logo.png"}
                            alt='logo'
                            width={96}
                            height={32}
                            className="h-8 sm:h-10 md:h-11 w-auto object-contain"
                        />
                    </Link>
                    <Button
                        variant={"gost"}
                        size={"icon"}
                        className="lg:hidden"
                        onClick={toggleSidebar}
                    >
                        <X className='h-5 w-5' />
                    </Button>
                </div>
                <nav className='p-4 space-y-2'>
                    {sidebarItems.map((item, index) => {
                        let isActive = false
                        if (pathname === item.href) {
                            isActive = true
                        }
                        else if (item.href !== "/dashboard" && pathname.startsWith(item.href)) {
                            isActive = true;
                        }
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                onClick={() => setisSidebarOpen(false)}
                            >
                                <div className={cn("flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group", isActive ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 text-white" : "text-slate-300 hover:text-white hover:bg-slate-700/50")}>
                                    <item.icon className='h-5 w-5' />
                                    <span className='font-medium'>{item.title}</span>

                                    {/* Badge for Create Post if draft exists */}
                                    {item.title === "Create Post" && draftPost && (
                                        <Badge variant="secondary" className="ml-auto text-xs bg-orange-500/20 text-orange-300 border-orange-500/30" > Draft </Badge>
                                    )}
                                </div>
                            </Link>
                        )
                    })}
                </nav>
                {/* Side Bar Footer */}
                <div className='absolute bottom-4 left-4 right-4'>
                    <Link
                        href={"/dashboard/setting"}
                    >

                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-slate-300 hover:text-white rounded-xl p-4"
                        >
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                        </Button>

                    </Link>
                </div>

            </aside >
            <div className='ml-0 lg:ml-64'>
                <header className="fixed w-full top-0 right-0 z-30 bg-slate-800/80 backdrop-blur-md border-b border-slate-700">
                    <div className='flex items-center justify-between px-4 lg:px-8 py-4'>
                        <div>
                            <Button variant={"gost"} size={"sm"} className="lg:hidden" onClick={toggleSidebar} >
                                <Menu className='w-5 h-5' />
                            </Button>
                        </div>
                        <div className="h-10 flex items-center">
                            <UserButton />
                        </div>
                    </div>
                </header>
                <main className="mt-18">{children}</main>
                <Toaster richColors />
            </div>
        </div >
    )
}

export default DashboardLayout
