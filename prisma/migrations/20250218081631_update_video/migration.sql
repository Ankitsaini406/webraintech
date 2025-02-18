/*
  Warnings:

  - The primary key for the `NewsLetter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `CourseVideo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseVideo" DROP CONSTRAINT "CourseVideo_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "CourseVideo" DROP CONSTRAINT "CourseVideo_courseId_fkey";

-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isVisible" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "videoUrl" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "NewsLetter" DROP CONSTRAINT "NewsLetter_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "NewsLetter_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "NewsLetter_id_seq";

-- DropTable
DROP TABLE "CourseVideo";
