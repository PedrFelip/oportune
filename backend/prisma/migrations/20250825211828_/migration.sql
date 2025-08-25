/*
  Warnings:

  - You are about to drop the column `site` on the `empresas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."empresas" DROP COLUMN "site",
ADD COLUMN     "emailContato" TEXT,
ADD COLUMN     "redesSociais" TEXT[];
