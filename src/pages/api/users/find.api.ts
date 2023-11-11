import { prisma } from '../../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { compare } from 'bcryptjs-react';
import jwt from "jsonwebtoken";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method != 'POST') {
        return res.status(405).end()
    }

    const { email, password } = req.body;

    const userExists = await prisma.user.findFirst({
      where: { email }
    });

    if (!userExists) {
      throw new Error("Usuario não existe.");
    }

    const checkPassword = await compare(password, userExists.password);

    if (!checkPassword) {
      throw new Error("Usuario ou senha incorreto.");
    }

    const token = jwt.sign({ id: userExists.id }, "secret", {
      expiresIn: '1d'
    });

    const data = { ...userExists, token }
    return data;
}
