import { auth, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { redirect } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server';

const protectedRoute = createRouteMatcher(["/dashboard(.*)","/feed(.*)"]) // we have to protect the /dashboard and /dashboard/anything 


export default clerkMiddleware(async(auth,req)=>{
 const {userId} = await auth() // auth() is a fuction which return a object of info of the currrent user and other things as well like redirectToSignIn,etc
 if(!userId && protectedRoute(req)){
  const {redirectToSignIn} = await auth()

  return redirectToSignIn()
 } 
 return NextResponse.next() // If the user is logged in, just let them continue to the page
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};