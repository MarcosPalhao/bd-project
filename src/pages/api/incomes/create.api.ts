import { prisma } from '../../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import { AuthOptions } from '../auth/[...nextauth].api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != 'POST') {
    return res.status(405).end()
  }


  const session = await getServerSession(req, res, AuthOptions)


  if (!session) {
    return res.status(401);
  }

  const emailSession = session.user.email;

  const userExists = await prisma.user.findFirst({
    where: { email: emailSession }
  });

  const { description, price, category_id } = req.body;
  let date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;

  console.log(date);

  const expense = await prisma.income.create({  
    data: {
      description,
      price,
      category_id,
      user_id: userExists.id,
      created_at: date
    }
  })

  return res.status(201).json(expense)
}
