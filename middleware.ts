import { authMiddleware } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    publicRoutes: ["/", "/websites", "/pricing", "/music", "/music/(.*)", "/contact-us", "/estimate", "/api/(.*)"],
    // publicRoutes: ["/(.*)", "/api/(.*)", "/trpc/(.*)"],
    afterAuth: async ({ user }) => {
        // If user is signed in, redirect to home page
        if (user) {
            return redirect("/");
        }

        // Otherwise, proceed with the original request (or redirect to sign-in if desired)
        return undefined;
    },
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
