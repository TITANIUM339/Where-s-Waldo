/*
  Warnings:

  - Added the required column `imageURL` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Character" ADD COLUMN     "imageURL" TEXT NOT NULL;
