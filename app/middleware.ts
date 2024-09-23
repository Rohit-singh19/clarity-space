import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const isPublicRoute = createRouteMatcher(["/home(.*)"]);

export default clerkMiddleware((auth, req) => {
  console.log("isPublicRoute:::", isPublicRoute(req));
  console.log("auth:::", auth());
  if (!isPublicRoute(req) && !auth().userId) {
    console.log("here:::");
    redirect("/home");
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
