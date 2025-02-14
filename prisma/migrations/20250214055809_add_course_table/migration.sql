/*
  Warnings:

  - You are about to drop the column `linkedin` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "linkedin",
ADD COLUMN     "linkdin" TEXT DEFAULT '';
