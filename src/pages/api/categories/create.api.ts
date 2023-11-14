import { prisma } from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "../auth/[...nextauth].api";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    return res.status(405).end();
  }

  const { name } = req.body;

  const session = await getServerSession(req, res, AuthOptions);

  if (!session) {
    return res.status(401);
  }

  const emailSession = session.user.email;

  const userExists = await prisma.user.findFirst({
    where: { email: emailSession },
  });

  console.log(userExists);

  const categoryExists = await prisma.category.findFirst({
    where: {
      name,
      user_id: userExists.id
    },
  });

  if (categoryExists) {
    return res.status(400).json({
      message: "Categoria já cadastrada.",
    });
  }

  const category = await prisma.category.create({
    data: {
      user_id: userExists?.id,
      name,
    },
  });

  const team = {
    teamCode: "4SI_GBD_01",
    teamPassword: "PW6ij2HLZ3",
    teamDbName: "DespesaControl",
    teamDbTable: "category",
    teamItemId: category.id,
    teamCrud: "CREATE",
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

  return res.status(201).json(category);
}
