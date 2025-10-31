import { internal } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const toggleLike = mutation({
    args: {
        postId: v.id("posts")
    },
    handler: async (ctx, args) => {
        const post = await ctx.db.get(args.postId);

        const user = await ctx.runQuery(internal.users.getCurrentUser)

        const existingLike = await ctx.db
            .query("likes")
            .filter((q) =>
                q.and(
                    q.eq(q.field("postId"), args.postId),
                    q.eq(q.field("userId"), user._id)
                )
            )
            .unique();

        if (existingLike) {
            // Unlike - remove the like
            await ctx.db.delete(existingLike._id);

            // Decrement like count
            await ctx.db.patch(args.postId, {
                likeCount: Math.max(0, post.likeCount - 1),
            });

            return { liked: false, likeCount: Math.max(0, post.likeCount - 1) };
        } else {
            // Like - add the like
            await ctx.db.insert("likes", {
                postId: args.postId,
                userId: user._id,
                createdAt: Date.now(),
            });

            // Increment like count
            await ctx.db.patch(args.postId, {
                likeCount: post.likeCount + 1,
            });

            return { liked: true, likeCount: post.likeCount + 1 };
        }

    }
})

// Check if user has liked a post
export const hasUserLiked = query({
    args: {
        postId: v.id("posts"),
    },
    handler: async (ctx, args) => {

        const user = await ctx.runQuery(internal.users.getCurrentUser)

        const like = await ctx.db
            .query("likes")
            .filter((q) =>
                q.and(
                    q.eq(q.field("postId"), args.postId),
                    q.eq(q.field("userId"), user._id)
                )
            )
            .unique();

        return !!like;
    },
});
