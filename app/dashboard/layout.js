"use client"

import { FileText, Ghost, LayoutDashboard, LayoutListIcon, Menu, PenTool, Settings, User, X } from 'lucide-react'
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
        },
        {
            title: "Explore Feed",
            href: "/feed", // to avoid isActive at very beginning 
            icon: LayoutListIcon
        },
    ]

    return (
        <div>

            <aside className={cn("fixed top-0 left-0 h-full w-64 bg-[#101112] backdrop-blur-sm z-50 transition-transform border-r-1 duration-300 lg:translate-x-0", isSidebarOpen ? "translate-x-0" : "-translate-x-full")}>
                <div className='flex items-center justify-between p-5' >
                    <Link href={"/"} className='flex items-center flex-shrink-0 mt-4 gap-2'>
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-black font-bold text-lg">F</span>
                        </div>
                        <span className={`hidden sm:block text-xl font-black`}>
                            Faizbook.ai
                        </span>
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
                                <div className={cn("flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group", isActive ? " border-1 bg-black text-white/90" : "text-white/40 hover:text-white")}>
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
                <header className="fixed w-full top-0 right-0 z-30 bg-[#101112] backdrop-blur-md">
                    <div className='flex items-center justify-between px-4 lg:px-8 py-2'>
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
