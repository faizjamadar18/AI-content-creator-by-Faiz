
// This page is basically creatin an API to coonect with DB and to store uodate delete data from db 

// Query → for reading data (like GET)
// Mutation → for writing or changing data (like POST, PUT, or DELETE)
import { useQuery } from "convex/react";
import { internal } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


// copied from docs 
export const store = mutation({ // The word mutation means: “we are changing or updating data in the database.”
    args: {}, // Arguments (inputs) this function expects
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeUser without authentication present");
        }

        // Check if we've already stored this identity before.
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier),
            )
            .unique();
        if (user !== null) {
            // If we've seen this identity before but the name has changed, patch the value. update the value 
            if (user.name !== identity.name) {
                await ctx.db.patch(user._id, { name: identity.name });
            }
            return user._id;
        }
        // If it's a new identity, create a new `User`.
        return await ctx.db.insert("users", {
            name: identity.name ?? "Anonymous",
            tokenIdentifier: identity.tokenIdentifier,
            email: identity.email,
            imageUrl: identity.pictureUrl,
            createdAt: Date.now(),
            lastActiveAt: Date.now(),

        });
    },
});


// written by owm from refering above code 
export const getCurrentUser = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return null
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    },
});

export const updateUsername = mutation({  // mutation is for updation in the data of DB 
    args: {                                // argument is the new username 
        username: v.string()
    },
    handler: async (ctx, args) => {           // it is the main function of these updateusername function 
        // ctx is a object which has three main values auth ,db ,runQuery,runMutation

        const user = await ctx.runQuery(internal.users.getCurrentUser)

        // own logic: here in 'user' we have al the data of the user so we can uodate the username now 
        // but before updating we have to check wheter the username is valid or not 

        const usernameRegex = /^[a-zA-Z0-9]+$/
        // - ^ and $ mean the pattern must match the entire string from start to end.
        // - [a - z A - Z 0 -9 _ -] means:
        // - a - z: lowercase letters
        // - A - Z: uppercase letters
        // - 0 - 9: numbers
        // - _: underscore
        // - -: hyphen
        // - + means one or more of these characters must be present.

        if (!usernameRegex.test(args.username)) {
            throw new Error(
                "Username can only contain letters, numbers, underscores, and hyphens"
            );
        }
        if (args.username.length < 3 || args.username.length > 20) {
            throw new Error("Username must be between 3 and 20 characters");
        }

        // Check if username is already taken in the multiple usernames in the DB(skip check if it's the same as current)
        if (args.username !== user.username) {
            const existingUser = await ctx.db
                .query("users")
                .withIndex("by_username", (q) => q.eq("username", args.username))
                .unique();

            if (existingUser) {
                throw new Error("Username is already taken");
            }
        }



        // Finally Update the username: 
        await ctx.db.patch(user._id, {
            username: args.username
        }
        )
        return user._id
    }
})

// Get user by username (for public profiles)
export const getByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    if (!args.username) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), args.username))
      .unique();

    if (!user) {
      return null;
    }

    // Return only public fields
    return {
      _id: user._id,
      name: user.name,
      username: user.username,
      imageUrl: user.imageUrl,
      createdAt: user.createdAt,
    };
  },
});

