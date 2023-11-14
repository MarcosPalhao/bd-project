import { getServerSession } from "next-auth/next";
import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthOptions } from "../../auth/[...nextauth].api";
import axios from "axios";

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
  const session = await getServerSession(req, res, AuthOptions);

  if (!session) {
    return res.status(401);
  }

  const emailSession = session.user.email;

  const userExists = await prisma.user.findFirst({
    where: { email: emailSession },
  });

  const team = {
    teamCode: "4SI_GBD_01",
    teamPassword: "PW6ij2HLZ3",
    teamDbName: "DespesaControl",
    teamDbTable: "income",
    teamItemId: incomeId,
    teamCrud: "DELETE",
    teamUsername: userExists.name,
  };

  async function postLoggingApi() {
    try {
      const res = await axios.post(
        "http://54.235.63.166:8000/insert/" +
          "{your_team" +
          ", " +
          "your_password" +
          ", " +
          "your_dbname" +
          ", " +
          "your_table" +
          ", " +
          "your_table_pk" +
          ", " +
          "crud" +
          ", " +
          "your_username}" +
          "?&your_team=" +
          team.teamCode +
          "&your_password=" +
          team.teamPassword +
          "&your_dbname=" +
          team.teamDbName +
          "&your_table=" +
          team.teamDbTable +
          "&your_table_pk=" +
          1 +
          "&crud=" +
          team.teamCrud +
          "&your_username=" +
          team.teamUsername
      );
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  postLoggingApi();
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
