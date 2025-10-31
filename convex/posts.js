
import { internal } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// gives the the post whose status is "draft"
export const getUserDraft = query({
    handler: async (ctx) => {
        // this gives us the user data and verify whether the user is login or not 
        const user = await ctx.runQuery(internal.users.getCurrentUser)
        const existingDraft = await ctx.db
            .query("posts")
            .filter((q) =>
                q.and(
                    q.eq(q.field("authorId"), user._id),
                    q.eq(q.field("status"), "draft")
                )
            )
            .unique();
        // q.field(): “select this column from the table”.
        // q.eq(a, b) : It means — “check if a is equal to b”.
        // q.and(condition1, condition2) : It means — “both conditions must be true”.

        // the variable existingDraft contains post with status: "draft" and before it also check the authorId is equal to the logged in userId 

        return existingDraft

    },
});

// add post : 
export const create = mutation({  // used to add the data in the posts DB
    args: {
        title: v.string(),
        content: v.string(),
        status: v.union(v.literal("draft"), v.literal("published")),
        featuredImage: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const user = await ctx.runQuery(internal.users.getCurrentUser)
        const existingDraft = await ctx.db
            .query("posts")
            .filter((q) =>
                q.and(
                    q.eq(q.field("authorId"), user._id),
                    q.eq(q.field("status", "draft"))
                )
            )
            .unique();
        const now = Date.now()


        if (args.status === "published" && existingDraft) {  // user have clicked on published button and it was a dreafted post 
            await ctx.db.patch(existingDraft._id, {
                title: args.title,
                content: args.content,
                status: "published",
                featuredImage: args.featuredImage,
                updatedAt: now,
                publishedAt: now,
            })
            return existingDraft._id
        }

        if (args.status === "draft" && existingDraft) {  // user have again clicked on draft(save) button and it was too a drafted post 
            await ctx.db.patch(existingDraft._id, {
                title: args.title,
                content: args.content,
                featuredImage: args.featuredImage,
                updatedAt: now,
            })
            return existingDraft._id
        }

        // creating a fresh and new post no drafted post available: 
        const postId = await ctx.db.insert("posts", {
            title: args.title,
            content: args.content,
            status: args.status,
            authorId: user._id,
            featuredImage: args.featuredImage,
            createdAt: now,
            updatedAt: now,
            publishedAt: args.status === "published" ? now : undefined,
            viewCount: 0,
            likeCount: 0,
        })
        return postId

    }
})

// Update an published post or a drafted post on clicking the update button : 
export const update = mutation({
    args: {
        id: v.id("posts"),
        title: v.string(),
        content: v.string(),
        status: v.union(v.literal("draft"), v.literal("published")),
        featuredImage: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const user = await ctx.runQuery(internal.users.getCurrentUser)
        const post = ctx.db.get(args.id,)  // It’s used to get one single row from your posts  database,using its unique _id.
        if (!post) {
            throw new Error("Post not found");
        }

        // Check if user owns the post
        // if (post.authorId !== user._id) {
        //     console.log(post.authorId,user._id)
        //     throw new Error("Not authorized to update this post");
        // }

        const now = Date.now();
        const updateData = {  // crate an empty object in which updated data is stored which csn br futher pathed to ustade that particular post  
            updatedAt: now,
        };

        // Add extra values to updateData object 
        if (args.title !== undefined) updateData.title = args.title;
        if (args.content !== undefined) updateData.content = args.content;
        if (args.featuredImage !== undefined)
            updateData.featuredImage = args.featuredImage;

        // Handle status change
        if (args.status !== undefined) {
            updateData.status = args.status;
        }

        // if it was an drafted post and now it has make published 
        if (args.status === "published" && post.status === "draft") {
            updateData.publishedAt = now;
        }

        // These if statements are used to
        // Update only the provided fields (avoid overwriting others).
        // Handle special rules (like updating publishedAt).
        // Protect the database from unwanted or insecure updates.

        await ctx.db.patch(args.id, updateData);
        return args.id;
    }
})

// Get user's posts
export const getUserPosts = query({
    handler: async (ctx) => {

        const user = await ctx.runQuery(internal.users.getCurrentUser)
        if (!user) {
            return [];
        }
        let query = ctx.db
            .query("posts")
            .filter((q) => q.eq(q.field("authorId"), user._id));


        const posts = await query.order("desc").collect();

        // Add username to each post
        return posts.map((post) => ({
            ...post,
            username: user.username,
        }));

    },
});


// Get a single post by ID
export const getById = query({
    args: { id: v.id("posts") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});


/// delete a post with id : 
export const deletePost = mutation({
    args: {
        id: v.id("posts")
    },
    handler: async (ctx, args) => {
        const user = await ctx.runQuery(internal.users.getCurrentUser)
        const post = await ctx.db.get(args.id)

        if (post.authorId !== user._id) {
            throw new Error("Not authorized to delete this post");
        }
        await ctx.db.delete(args.id)
        return { success: true }
    },
})

