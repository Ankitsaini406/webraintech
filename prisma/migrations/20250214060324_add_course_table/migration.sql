/*
  Warnings:

  - Added the required column `slug` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `CourseVideo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CourseVideo" ADD COLUMN     "slug" TEXT NOT NULL;
