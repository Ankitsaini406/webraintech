/*
  Warnings:

  - Added the required column `intro` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "intro" TEXT NOT NULL;
