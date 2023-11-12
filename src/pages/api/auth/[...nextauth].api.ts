import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider  from 'next-auth/providers/credentials';
import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcryptjs-react';
import jwt from "jsonwebtoken";

export const AuthOptions: NextAuthOptions = {
    pages: {
        signIn: '/login',
        error: '/login', // Error code passed in query string as ?error=
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },  

            async authorize(credentials, req) {
                const { email, password } = credentials;
                console.log({ email, password });

                const userExists = await prisma.user.findFirst({
                    where: { email }
                });
            
                if (!userExists) {
                    console.error("Usuario não existe.");
                    return null;
                }

                // const hashPassword = await bcrypt.hash(password, 12);
            
                const checkPassword = await bcrypt.compare(password, userExists.password);
                
            
                if (!checkPassword) {
                    console.error("Usuario ou senha incorreto.");
                    return null;
                }
            
                return userExists;
            }
        })
    ]
};

export default NextAuth(AuthOptions);
