import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)', 
  '/public(.*)'
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request) && request.nextUrl.pathname.startsWith('/garantia')) {
    auth().protect();
  }
});
