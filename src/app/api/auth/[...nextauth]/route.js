import CredentialsProvider  from "next-auth/providers/credentials";
import db from "@/utils/mongo";
import NextAuth from "next-auth";
export const authOptions = {
  // Configure one or more authentication providers
  secret:process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",   // 👈 use your custom login page
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },

      },
      async authorize(credentials) {
        
        const users =db.collection("users");
        const user = await users.findOne({ email: credentials.email,password:credentials.password});
        if (user) {
          return Promise.resolve({
            id: user._id.toString(),
            email: user.email,
            name: user.name || "User",
  });
        } else {
          
          return Promise.resolve(null);
        }
      }
    }),
 
   
  ],
 
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };