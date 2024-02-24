import { PrismaAdapter } from '@auth/prisma-adapter'
import { AuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialProvider from 'next-auth/providers/credentials'
import { db } from './prisma'
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) : Promise<any>{

                console.log("Authorize method", credentials)


                if(!credentials?.email || !credentials?.password) throw new Error("Data missing") 

                const user = await db.user.findUnique({
                    where:{
                        email: credentials?.email
                    }
                })

                if(!user || !user.hashedPassword) {
                    throw new Error("Users not registered via credentials")
                }

                const matchPassword = await bcrypt.compare(credentials.password, user.hashedPassword)
                if(!matchPassword)
                    throw new Error("Incorrect password or unregistered user")

                return user
            }
        })
    ],
    callbacks: {
        async session({ session, user }) {
            session.user = { ...session.user, id: user.id } as {
                id: string
                name: string
                email: string
            }

            return session
        },
    },
    secret: process.env.NEXT_AUTH_SECRET,
}
