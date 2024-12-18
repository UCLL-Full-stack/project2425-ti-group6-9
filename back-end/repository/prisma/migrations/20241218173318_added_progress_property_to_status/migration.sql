/*
  Warnings:

  - Added the required column `progress` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Status" ADD COLUMN     "progress" INTEGER NOT NULL;
