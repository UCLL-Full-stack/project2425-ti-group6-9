/*
  Warnings:

  - You are about to drop the `_BookToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BookToUser" DROP CONSTRAINT "_BookToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToUser" DROP CONSTRAINT "_BookToUser_B_fkey";

-- DropTable
DROP TABLE "_BookToUser";

-- CreateTable
CREATE TABLE "_UserBooks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserBooks_AB_unique" ON "_UserBooks"("A", "B");

-- CreateIndex
CREATE INDEX "_UserBooks_B_index" ON "_UserBooks"("B");

-- AddForeignKey
ALTER TABLE "_UserBooks" ADD CONSTRAINT "_UserBooks_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBooks" ADD CONSTRAINT "_UserBooks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
