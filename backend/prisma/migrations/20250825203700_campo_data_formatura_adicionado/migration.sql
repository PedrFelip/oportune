/*
  Warnings:

  - Added the required column `dataFormatura` to the `estudantes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."estudantes" ADD COLUMN     "dataFormatura" TIMESTAMP(3) NOT NULL;
