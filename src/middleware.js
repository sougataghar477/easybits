import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // redirect here if no session
  },
});

// Protect only dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
