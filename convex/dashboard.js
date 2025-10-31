import { internal } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const getAnalytics = query({
    handler: async (ctx) => {

        const user = await ctx.runQuery(internal.users.getCurrentUser)
        // Get all user's posts
        const posts = await ctx.db
            .query("posts")
            .filter((q) => q.eq(q.field("authorId"), user._id))
            .collect();

        // Get user's followers count
        const followersCount = await ctx.db
            .query("follows")
            .filter((q) => q.eq(q.field("followingId"), user._id))
            .collect();

        // Calculate analytics
        const totalViews = posts.reduce((sum, post) => sum + post.viewCount, 0);
        const totalLikes = posts.reduce((sum, post) => sum + post.likeCount, 0);

        // Get comments count for user's posts
        const postIds = posts.map((p) => p._id);
        let totalComments = 0;

        for (const postId of postIds) {
            const comments = await ctx.db
                .query("comments")
                .filter((q) =>
                    q.eq(q.field("postId"), postId)
                )
                .collect();
            totalComments += comments.length;
        }

        return {
            totalViews,
            totalLikes,
            totalComments,
            totalFollowers: followersCount.length,
        }

    }
})

// for getting the follower count we see the follows.js 


