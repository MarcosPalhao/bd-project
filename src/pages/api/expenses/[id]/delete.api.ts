import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "DELETE") {
    return res.status(405).end();
  }

  const expenseId = String(req.query.id);

  const expenseExists = await prisma.expense.findUnique({
    where: {
      id: expenseId,
    },
  });

  if (!expenseExists) {
    return res.status(400).json({
      message: "Despesa não encontrada ou não existe.",
    });
  }

  await prisma.expense.delete({
    where: {
      id: expenseId,
    },
  });

  return res.status(200).json({
    message: "Despesa deletada com sucesso",
  });
}
