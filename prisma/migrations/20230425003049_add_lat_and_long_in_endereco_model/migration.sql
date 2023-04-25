/*
  Warnings:

  - Added the required column `lat` to the `Endereco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long` to the `Endereco` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Endereco" ADD COLUMN     "lat" TEXT NOT NULL,
ADD COLUMN     "long" TEXT NOT NULL;
