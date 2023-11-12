import { prisma } from '../../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method != 'POST') {
        return res.status(405).end()
    }

    const { name } = req.body;

    const categoryExists = await prisma.category.findFirst({
        where: {
            name,
        }
    })

    if (categoryExists) {
        return res.status(400).json({
            message: 'Categoria já cadastrada.'
        });
    }

    if (!categoryExists) {
        const category = await prisma.category.create({
          data: {
            name,
          }
        })
    
        return res.status(201).json(category)
    }
}
