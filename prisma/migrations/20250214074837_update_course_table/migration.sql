/*
  Warnings:

  - Added the required column `bannerImage` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "bannerImage" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ALTER COLUMN "certification" DROP DEFAULT,
ALTER COLUMN "certification" SET DATA TYPE TEXT;
