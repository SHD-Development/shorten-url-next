import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { url } = await request.json();
  const shortCode = nanoid(6);

  const shortUrl = await prisma.url.create({
    data: {
      longUrl: url,
      shortCode,
    },
  });

  return NextResponse.json(shortUrl);
}
