import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "DELETE") {
    return res.status(405).end();
  }

  const incomeId = String(req.query.id);

  const incomeExists = await prisma.income.findUnique({
    where: {
      id: incomeId,
    },
  });

  if (!incomeExists) {
    return res.status(400).json({
      message: "Receita não encontrada ou não existe.",
    });
  }

  await prisma.income.delete({
    where: {
      id: incomeId,
    },
  });

  return res.status(200).json({
    message: "Receita deletada com sucesso",
  });
}
