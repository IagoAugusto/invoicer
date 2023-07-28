import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function GET() {
  const newUser = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
    },
  });

  const users = await prisma.user.findMany();

  return NextResponse.json({ name: "Iago" });
}
