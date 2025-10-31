
import { internal } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getPubishedPostByUsername = query({
    args: {
        username: v.string()
    },
    handler: async (ctx, args) => {

        // First get the user by username
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("username"), args.username))
            .unique();


        if (!user) {
            return []
        }



        // Get published posts by this user
        const posts = await ctx.db
            .query("posts")
            .filter((q) =>
                q.and(
                    q.eq(q.field("authorId"), user._id),
                    q.eq(q.field("status"), "published")
                )
            )
            .order("desc")
            .collect();   // <-- IMPORTANT




        // Add author info to each post
        const postsWithAuthor = await Promise.all(  // the below all codes ase async hence the will return promise thu we have used  Promise.all() which will wait till all the promisses are resolves in the same order 
            posts.map(async (post) => ({
                ...post,
                author: {         // add an author oject in the post array 
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    imageUrl: user.imageUrl,
                },
            }))
        );

        return postsWithAuthor


    }
})


// Get a single published post by username and post ID
export const getPublishedPost = query({
    args: {
        username: v.string(),
        postId: v.id("posts"),
    },
    handler: async (ctx, args) => {
        // Get the user by username
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("username"), args.username))
            .unique();

        if (!user) {
            return null;
        }

        // Get the post
        const post = await ctx.db.get(args.postId);

        if (!post) {
            return null;
        }

        // Verify the post belongs to this user and is published
        if (post.authorId !== user._id || post.status !== "published") {
            return null;
        }

        // Return post with author info
        return {
            ...post,
            author: {
                _id: user._id,
                name: user.name,
                username: user.username,
                imageUrl: user.imageUrl,
            },
        };
    },
});

export const increamentViewCount = mutation({
    args: {
        postId: v.id("posts")
    },
    handler: async (ctx, args) => {
        const post = await ctx.db.get(args.postId);

        if (!post || post.status !== "published") {
            return;
        }

        // Update view count
        await ctx.db.patch(args.postId, {
            viewCount: post.viewCount + 1,
        });
        return { success: true };

    }
})