import { internal } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


// Get feed posts - can improve it to show following posts first
export const getFeed = query({

  handler: async (ctx) => {

    const allPosts = await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("status"), "published"))
      .order("desc")
      .take(10)  // .take(10) runs inside the database works on query 

    const postsWithAuthors = await Promise.all(
      allPosts.map(async (post) => {
        const author = await ctx.db.get(post.authorId);
        return {
          ...post,
          author: author
            ? {
                _id: author._id,
                name: author.name,
                username: author.username,
                imageUrl: author.imageUrl,
              }
            : null,
        };
      })
    );

    return {
      posts: postsWithAuthors.filter((post) => post.author !== null)  // render the only one whose author is not equal yo null 
    };
  },
});


// Get trending posts (high engagement in last 7 days)
export const getTrendingPosts = query({
  handler: async (ctx) => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    // Get recent published posts
    const recentPosts = await ctx.db
      .query("posts")
      .filter((q) =>
        q.and(
          q.eq(q.field("status"), "published"),
          q.gte(q.field("publishedAt"), weekAgo)
        )
      )
      .collect();

    // Calculate trending score and sort
    const trendingPosts = recentPosts
      .map((post) => ({
        ...post,
        trendingScore: post.viewCount + post.likeCount * 3,
      }))
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0,10)   //works on array top 10 

    // Add author information
    const postsWithAuthors = await Promise.all(
      trendingPosts.map(async (post) => {
        const author = await ctx.db.get(post.authorId);
        return {
          ...post,
          author: author
            ? {
                _id: author._id,
                name: author.name,
                username: author.username,
                imageUrl: author.imageUrl,
              }
            : null,
        };
      })
    );

    return postsWithAuthors.filter((post) => post.author !== null);
  },
});