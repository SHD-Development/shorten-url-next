-- CreateTable
CREATE TABLE "Url" (
    "id" TEXT NOT NULL,
    "longUrl" TEXT NOT NULL,
    "shortCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clicks" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClickLog" (
    "id" TEXT NOT NULL,
    "urlId" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClickLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortCode_key" ON "Url"("shortCode");

-- AddForeignKey
ALTER TABLE "ClickLog" ADD CONSTRAINT "ClickLog_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
