"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/convex/_generated/api'
import { useConvexQuery } from '@/hooks/use-convex-query-mutation'
import { useUser } from '@clerk/nextjs'
import { Eye, Heart, icons, Loader2, MessageCircle, PlusCircle, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {


  const { data: analytics, isLoading: analyticsLoading } = useConvexQuery(api.dashboard.getAnalytics)


  if (analyticsLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-400 mx-auto" />
          <p className="text-slate-400 mt-4">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  const stats = [
    {
      title: "Total Views",
      value: analytics.totalViews,
      icon: Eye
    },
    {
      title: "Total Likes",
      value: analytics.totalLikes,
      icon: Heart
    },
    {
      title: "Total Comments",
      value: analytics.totalComments,
      icon: MessageCircle 
    },
    {
      title: "Total Followers",
      value: analytics.totalFollowers,
      icon: Users
    },


  ]
  return (
    <div className="space-y-8 p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text-primary">
            Dashboard
          </h1>
          <p className="text-slate-400 mt-2">
            Welcome back! Here's what's happening with your content.
          </p>
        </div>

        <Link href="/dashboard/create">
          <Button variant={"primary"}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Post
          </Button>
        </Link>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat,index) => (
          <Card key={index} className="bg-[#101112]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-slate-300">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      

    </div>
  )
}

export default page
