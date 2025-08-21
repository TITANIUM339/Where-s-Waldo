/*
  Warnings:

  - The primary key for the `Leaderboard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Leaderboard` table. All the data in the column will be lost.
  - Added the required column `playerId` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Leaderboard" DROP CONSTRAINT "Leaderboard_pkey",
DROP COLUMN "id",
ADD COLUMN     "playerId" TEXT NOT NULL,
ADD CONSTRAINT "Leaderboard_pkey" PRIMARY KEY ("playerId", "gameId");
