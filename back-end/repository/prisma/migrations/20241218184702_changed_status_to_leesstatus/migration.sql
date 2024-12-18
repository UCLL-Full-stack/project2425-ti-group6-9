/*
  Warnings:

  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Status" DROP CONSTRAINT "Status_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Status" DROP CONSTRAINT "Status_userId_fkey";

-- DropTable
DROP TABLE "Status";

-- CreateTable
CREATE TABLE "LeesStatus" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "LeesStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LeesStatus" ADD CONSTRAINT "LeesStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeesStatus" ADD CONSTRAINT "LeesStatus_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
