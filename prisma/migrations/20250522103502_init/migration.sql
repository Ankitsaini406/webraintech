/*
  Warnings:

  - You are about to drop the column `linkdin` on the `Placement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Placement" DROP COLUMN "linkdin",
ADD COLUMN     "linkedin" TEXT;
