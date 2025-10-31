import { internal } from "./_generated/api";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Toggle follow/unfollow a user
export const toggleFollow = mutation({
    args: { followingId: v.id("users") },
    handler: async (ctx, args) => {

        const follower = await ctx.runQuery(internal.users.getCurrentUser)
        if (!follower) {
            throw new Error("User not found");
        }

        // Can't follow yourself
        if (follower._id === args.followingId) {
            throw new Error("You cannot follow yourself");
        }

        // Check if already following
        const existingFollow = await ctx.db
            .query("follows")
            .filter((q) =>
                q.and(
                    q.eq(q.field("followerId"), follower._id),
                    q.eq(q.field("followingId"), args.followingId)
                )
            )
            .unique();

        if (existingFollow) {
            // Unfollow
            await ctx.db.delete(existingFollow._id);
            return { following: false };
        } else {
            // Follow
            await ctx.db.insert("follows", {
                followerId: follower._id,
                followingId: args.followingId,
                createdAt: Date.now(),
            });
            return { following: true };
        }
    },
});

// Check if current user is following a specific user
// This function checks whether the current logged-in user is already following another user.
// If yes → returns true
// If no → returns false
export const isFollowing = query({
    args: { followingId: v.optional(v.id("users")) },
    handler: async (ctx, args) => {
        const follower = await ctx.runQuery(internal.users.getCurrentUser)

        if (!follower) {
            return false;
        }

        const follow = await ctx.db
            .query("follows")
            .filter((q) =>
                q.and(
                    q.eq(q.field("followerId"), follower._id),
                    q.eq(q.field("followingId"), args.followingId)
                )
            )
            .unique();

        return !!follow;   // So this returns strictly true or false.like !!null = false , !!undefied=false , !!12345= true
    }, 
});


// Get follower count for a user
export const getFollowerCount = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const follows = await ctx.db
      .query("follows")
      .filter((q) => q.eq(q.field("followingId"), args.userId))  // folowing row me uss user ka naam kitne baar aaya hai ye pata kre usse usko kitne logo ne follow kiya hai pata cheelega 
      .collect();

    return follows.length;
  },
});




