import NextAuth, { NextAuthOptions } from 'next-auth';
import { api } from "../../lib/axios";
import CredentialsProvider  from 'next-auth/providers/credentials';

const NexthAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { labe: 'email', type: 'text' },
                password: { labe: 'password', type: 'password' }
            },

            async authorize(credentials, req) {
                const response = 
            }
        })
    ]
};

const handler = NextAuth();

export { handler as GET, handler as POST };