import NextAuth, { User as NextAuthUser } from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {User}  from "@/models/User";
import connect from "@/utils/mongoDB";

interface User extends NextAuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
}

const authOptions: any = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              const userObj: User = {
                id: user._id.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                createdAt: user.createdAt,
              };
              return userObj;
            }
          }
        } catch (err: any) {
          throw new Error(err);
        }
        return null; // Return null if user or password is incorrect
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider == "credentials") {
        return true;
      }
      return false;
    },
  },
  session: {
    // Configure session max age (1 day in seconds)
    maxAge: 600, // 1 day in seconds
    updateAge: 300, // Update the session age every 1 hour
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
