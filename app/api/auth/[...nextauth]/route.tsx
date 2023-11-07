import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "@utils/Database";
import User from "@models/User";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    async session({session}:any){
        const sessionUser = await User.findOne({
            email: session.user.email,
        })
        session.user.id = sessionUser._id.toString();
        return session;
    },
    async signIn({profile}:any){
        try {
            await connectToDB();

            const userExists = await User.findOne({
                email: profile.email
            })

            if(!userExists){
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture
                })
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
})

export { handler as GET, handler as POST };