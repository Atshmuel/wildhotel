import NextAuth, { Account, Profile, Session, User } from "next-auth";
import Google from "next-auth/providers/google";
import { NextRequest } from "next/server";
import { createGuest, getGuest } from "./data-service";
import { CustomSession } from "@/types/types";

const authConfig = {
    providers: [Google({
        clientId: process.env.AUTH_GOOGLE_ID
        , clientSecret: process.env.AUTH_GOOGLE_SECRET
    })],
    callbacks: {
        authorized({ auth, request }: { auth: Session, request: NextRequest }) {
            return !!auth?.user
        },
        async signIn({ user, account, profile }: { user: User; account: Account | null; profile?: Profile }) {
            try {
                if (!user.email || !user.name) return false
                let existingGuest = await getGuest(user.email)
                if (!existingGuest) {
                    await createGuest({ fullName: user.name, email: user.email })
                }
                return true
            } catch {
                return false
            }
        },
        async session({ session, user }: { session: CustomSession, user: User }) {
            const guest = session?.user?.email ? await getGuest(session.user.email) : null
            if (guest && session.user) {
                session.user.guestId = guest._id
            }
            return session
        }
    },
    pages: {
        signIn: '/login',
    }

}

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(authConfig)
