"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TrendingUp, UserPlus, Loader2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import PostCard from "@/components/post-card";
import { useConvexQuery, useConvexMutation } from "@/hooks/use-convex-query-mutation";

export default function FeedPage() {
    const [activeTab, setActiveTab] = useState("feed"); // "feed" or "trending"


    // Data queries
    const { data: feedData, isLoading: feedLoading } = useConvexQuery(
        api.feed.getFeed
    );


    const { data: trendingPosts, isLoading: trendingLoading } = useConvexQuery(
        api.feed.getTrendingPosts
    );


    // Get current posts based on active tab
    const getCurrentPosts = () => {
        switch (activeTab) {
            case "trending":
                return trendingPosts || [];
            default:
                return feedData?.posts || [];
        }
    };

    const isLoading =
        feedLoading || (activeTab === "trending" && trendingLoading);
    const currentPosts = getCurrentPosts();

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-5">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Feed Header */}
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold gradient-text-primary pb-2">
                        Discover Amazing Content
                    </h1>
                    <p className="text-slate-400">
                        Stay up to date with the latest posts from creators you follow
                    </p>
                </div>

                {/* Main Feed */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="lg:col-span-4 space-y-6">
                        {/* Feed Tabs */}
                        <div className="flex space-x-2">
                            <Button
                                onClick={() => setActiveTab("feed")}
                                variant={activeTab === "feed" ? "primary" : "ghost"}
                                className="flex-1"
                            >
                                For You
                            </Button>
                            <Button
                                onClick={() => setActiveTab("trending")}
                                variant={activeTab === "trending" ? "primary" : "ghost"}
                                className="flex-1"
                            >
                                <TrendingUp className="h-4 w-4 mr-2" />
                                Trending
                            </Button>
                        </div>
                        {/* Posts Feed */}
                        {isLoading ? (
                            <div className="flex justify-center py-12">
                                <div className="text-center">
                                    <Loader2 className="h-8 w-8 animate-spin text-purple-400 mx-auto mb-4" />
                                    <p className="text-slate-400">Loading posts...</p>
                                </div>
                            </div>
                        ) : currentPosts.length === 0 ? (
                            <Card className="bg-black hover:border-gray-400/50 transition-colors">
                                <CardContent className="text-center py-12">
                                    <div className="space-y-4">
                                        <div className="text-6xl">📝</div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">
                                                {activeTab === "trending"
                                                    ? "No trending posts right now"
                                                    : "No posts to show"}
                                            </h3>
                                            <p className="text-slate-400 mb-6">
                                                {activeTab === "trending"
                                                    ? "Check back later for trending content"
                                                    : "Follow some creators to see their posts here"}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <>
                                {/* Posts Grid */}
                                <div className="space-y-6">
                                    {currentPosts.map((post) => (
                                        <PostCard
                                            key={post._id}
                                            post={post}
                                            showActions={false}
                                            showAuthor={true}
                                            className="max-w-none"
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

        </div>
        
    )
}


