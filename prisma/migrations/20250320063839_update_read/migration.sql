-- AlterTable
ALTER TABLE "ContactUs" ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Enquery" ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "NewsLetter" ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false;
