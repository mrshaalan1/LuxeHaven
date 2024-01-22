  import NextAuth from "next-auth/next";
  import CredentialsProvider from "next-auth/providers/credentials";
  import bcrypt from "bcryptjs";
  import connect from "@/dbConfig/dbConfig";
  import User from "@/models/userModel";


  export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if(!credentials.email || !credentials.password) {
                    throw new Error('Please enter an email and password')
                }

                await connect();
                const user = await User.findOne({email: credentials.email}).select('+Password');

                // if no user was found 
                if (!user || !user?.password) {
                    throw new Error('No user found')
                }

                // check to see if password matches
                const passwordMatch = await bcrypt.compare(credentials.password, user.password)

                // if password does not match
                if (!passwordMatch) {
                    throw new Error('Incorrect password')
                }

                return user;
            },
        }),  
    ],
    callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.role = user.role;
            token.id = user.id;
          }
          return token;
        },
        session({ session, token }) {
          if (token && session.user) {
            session.user.role = token.role;
            session.user.id = token.id;
          }
          return session;
        },
      },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages:  {
        signIn: "/",
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}

