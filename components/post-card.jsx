"use client"
import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from './ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Edit, ExternalLink, Eye, Heart, MessageCircle, MoreHorizontal, MoreHorizontalIcon, Trash2 } from 'lucide-react'
import { formatDistanceToNow } from "date-fns";    //npm install date-fns

const PostCard = ({
    post,
    showActions = false,
    showAuthor = true,
    onEdit,
    onDelete,
}
) => {

    const getStatusBadge = (post) => {
        if (post.status === "published") {
            return {
                variant: "default",
                className: "bg-green-500/20 text-green-300 border-green-500/30",
                label: "Published",
            }
        }
        return {
            variant: "outline",
            className: "bg-orange-500/20 text-orange-300 border-orange-500/30",
            label: "Draft",
        };
    }
    // Get post URL for public viewing
    const getPostUrl = () => {
        if (
            post.status === "published" &&
            (post.author?.username || post?.username)
        ) {
            return `/${post.author?.username || post?.username}/${post._id}`;
        }
        return null;
    };

    const statusBadge = getStatusBadge(post);
    const publicUrl = getPostUrl();

    return (

        <Card
            className={` bg-[#101112] hover:border-purple-500/50 transition-colors`}
        >
            <CardContent>
                <div className="space-y-4">
                    {/* Featured Image */}
                    <Link
                        href={publicUrl || "#"}
                        className={!publicUrl ? "pointer-events-none" : ""}
                    >
                        <div className="relative w-full h-48 rounded-lg overflow-hidden">
                            <Image
                                src={post.featuredImage || "/placeholder.png"}
                                alt={post.title || " "}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </Link>

                    {/* Header */}
                    <div className="flex items-start justify-between mt-5">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <Badge
                                    variant={statusBadge.variant}
                                    className={statusBadge.className}
                                >
                                    {statusBadge.label}
                                </Badge>
                            </div>

                            <Link
                                href={publicUrl || "#"}
                                className={!publicUrl ? "pointer-events-none" : ""}
                            >
                                <h3 className="text-xl font-bold text-white hover:text-purple-300 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                            </Link>
                        </div>


                        {showActions && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="flex-shrink-0">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {onEdit && (
                                        <DropdownMenuItem onClick={() => onEdit(post)}>
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit Post
                                        </DropdownMenuItem>
                                    )}
                                    {publicUrl && (
                                        <DropdownMenuItem asChild>
                                            <Link href={publicUrl} >
                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                View Public
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                    {onDelete && (
                                        <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() => onDelete(post)}
                                                className="text-red-400 focus:text-red-400"
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Delete Post
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>

                    {/* Stats & Meta */}
                    <div className="flex items-center justify-between text-sm text-slate-400">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {post.viewCount?.toLocaleString() || 0}
                            </div>
                            <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4" />
                                {post.likeCount?.toLocaleString() || 0}
                            </div>
                            <div className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />0
                            </div>
                        </div>
                        <time>
                            {post.status === "published"
                                ? formatDistanceToNow(new Date(post.createdAt), {  //npm install date-fns
                                    addSuffix: true,
                                })
                                : formatDistanceToNow(new Date(post.updatedAt), {
                                    addSuffix: true,  // add "days ago" suffix 
                                })}
                        </time>
                    </div>
                </div>
        </CardContent>

        </Card >
    )
}

export default PostCard
