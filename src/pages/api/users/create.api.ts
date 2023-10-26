import { prisma } from '../../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method != 'POST') {
        return res.status(405).end()
    }

    const { name, email, password } = req.body

    const userExists = await prisma.user.findFirst({
        where: {
          email,
        }
    })

    if (userExists) {
      return res.status(400).json({
        message: 'Usuário já cadastrado.'
      });
    }

    if (!userExists) {
        const user = await prisma.user.create({
          data: {
            name,
            email,
            password
          }
        })
    
        return res.status(201).json(user)
    }
}
