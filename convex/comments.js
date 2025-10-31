import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";

// Add a comment to a post
export const addComment = mutation({
    args: {
        postId: v.id("posts"),
        content: v.string(),
    },
    handler: async (ctx, args) => {

        const user = await ctx.runQuery(internal.users.getCurrentUser)

        const post = await ctx.db.get(args.postId);

        // Validate content
        if (!args.content.trim() || args.content.length > 1000) {
            throw new Error("Comment must be between 1-1000 characters");
        }

        const commentId = await ctx.db.insert("comments", {
            postId: args.postId,
            authorId: user._id,
            authorName: user.name,
            authorEmail: user.email,
            content: args.content.trim(),
            createdAt: Date.now(),
        });

        return commentId;
    },
});

// Get comments for a post
export const getPostComments = query({
    args: { postId: v.id("posts") },
    handler: async (ctx, args) => {
        const comments = await ctx.db
            .query("comments")
            .filter((q) =>q.eq(q.field("postId"), args.postId))
            .order("asc")
            .collect();

        // Add user info for all comments (since all are from authenticated users
        const commentsWithUsers = await Promise.all(
            comments.map(async (comment) => {
                const user = await ctx.db.get(comment.authorId); // as author and user _id are same so find the user by authorId 
                return {
                    ...comment,
                    author: user
                        ? {
                            _id: user._id,
                            name: user.name,
                            username: user.username,
                            imageUrl: user.imageUrl,
                        }
                        : null,
                };
            })
        );

        return commentsWithUsers.filter((comment) => comment.author !== null);
    },
});

// Delete a comment (only by author or post owner)
export const deleteComment = mutation({
    args: { commentId: v.id("comments") },
    handler: async (ctx, args) => {
        
        const user = await ctx.runQuery(internal.users.getCurrentUser)

        const comment = await ctx.db.get(args.commentId);
        if (!comment) {
            throw new Error("Comment not found");
        }

        // Get the post to check if user is the post owner
        const post = await ctx.db.get(comment.postId);
        if (!post) {
            throw new Error("Post not found");
        }

        // Check if user can delete this comment (comment author or post owner)
        const canDelete =
            comment.authorId === user._id || post.authorId === user._id;

        if (!canDelete) {
            throw new Error("Not authorized to delete this comment");
        }

        await ctx.db.delete(args.commentId);
        return { success: true };
    },
});