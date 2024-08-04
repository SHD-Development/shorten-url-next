import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { shortCode: string } }
) {
  const { shortCode } = params;

  const url = await prisma.url.findUnique({
    where: { shortCode },
    include: {
      clickLogs: {
        orderBy: {
          timestamp: "desc",
        },
      },
    },
  });

  if (url) {
    return NextResponse.json(url.clickLogs);
  } else {
    return NextResponse.json({ message: "URL not found" }, { status: 404 });
  }
}
