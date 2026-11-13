// Checks if the user is authenticated before allowing access to certain routes. 
// If the user is not authenticated, they will be redirected to the sign-in page.

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes do not require login. We leave sign-in and sign-up public.
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/api/facts(.*)', '/api/content(.*)']);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};