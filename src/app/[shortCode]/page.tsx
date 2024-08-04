import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export default async function ShortUrlRedirect({
  params,
}: {
  params: { shortCode: string };
}) {
  const { shortCode } = params;
  const headersList = headers();
  const ip = headersList.get("x-forwarded-for") || "Unknown";

  const url = await prisma.url.findUnique({
    where: { shortCode },
  });

  if (url) {
    await prisma.$transaction([
      prisma.url.update({
        where: { id: url.id },
        data: { clicks: { increment: 1 } },
      }),
      prisma.clickLog.create({
        data: {
          urlId: url.id,
          ip: ip,
        },
      }),
    ]);

    redirect(url.longUrl);
  } else {
    return <div>URL not found</div>;
  }
}
