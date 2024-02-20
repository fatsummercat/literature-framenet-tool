/*
  Warnings:

  - The primary key for the `Literature` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Literature" DROP CONSTRAINT "Literature_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Literature_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Literature_id_seq";
