"use client"
import PostCard from '@/components/post-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { api } from '@/convex/_generated/api'
import { useConvexMutation, useConvexQuery } from '@/hooks/use-convex-query-mutation'
import { FileText, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'
import { useRouter } from "next/navigation";

const PostPage = () => {
    const { data: posts, isLoading } = useConvexQuery(api.posts.getUserPosts);
    const deletePost = useConvexMutation(api.posts.deletePost);

    const router = useRouter()
    const handleEditPost = (post) => {
        router.push(`/dashboard/posts/edit/${post._id}`);
    };

    const handleDeletePost = async (post) => {
        if (!window.confirm("Are you sure you want to delete this post?")) {
            return;
        }
        try {
            await deletePost.mutate({ id: post._id });
            toast.success("Post deleted successfully");
        } catch (error) {
            toast.error("Failed to delete post");
        }
    }

    if (isLoading) {
        return (
            <div suppressHydrationWarning className="flex items-center justify-center min-h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto"></div>
                    <p className="text-slate-400 mt-4">Loading your posts...</p>
                </div>
            </div>
        );
    }


    return (
        <div className="space-y-6 p-4 lg:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold gradient-text-primary">My Posts</h1>
                    <p className="text-slate-400 mt-2">
                        Manage and track your content performance
                    </p>
                </div>
                <Link href="/dashboard/create">
                    <Button variant="primary">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create New Post
                    </Button>
                </Link>
            </div>


            {/* Posts Grid */}
            {(!posts || posts.length === 0) ? (
                <Card className="card-glass">
                    <CardContent className="p-12 text-center">
                        <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-white mb-2">
                            "No posts yet"
                        </h3>
                        <p className="text-slate-400 mb-6">
                            Create your first post to get started
                        </p>
                        <Link href="/dashboard/create">
                            <Button variant="primary">
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Create Your First Post
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <PostCard
                            key={post._id}
                            post={post}
                            showActions={true}
                            showAuthor={false}
                            onEdit={handleEditPost}
                            onDelete={handleDeletePost}
                        />
                    ))}
                </div>
            )}
        </div>

    )
}

export default PostPage
