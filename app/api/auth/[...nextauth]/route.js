import NextAuth from "next-auth/next";
import GoogleProviders from 'next-auth/providers/google'

import { connectToDB } from "@utils/database";
import User from "@models/usermodel";


const handler = NextAuth({
    providers: [
        GoogleProviders({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            // grabs the current session user from the db
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            // assigns the session id with document id in database.
            session.user.id = (sessionUser._id).toString();
            return session;
        },

        async signIn({ profile }) {
            // serverless -> lambda function i.e everytime a function is called it spin ups a server and 
            // make a db connection instead of constantly running the server.
            try {
                await connectToDB();
                // we have to check if the user already exists
                const userExists = await User.findOne({ email: profile.email })
                // if user already doesnot exist we have to create a new one and save it to the DB.
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
});
export { handler as GET, handler as POST }
