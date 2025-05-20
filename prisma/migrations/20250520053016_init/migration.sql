-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "isDelete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPublish" BOOLEAN NOT NULL DEFAULT false;
