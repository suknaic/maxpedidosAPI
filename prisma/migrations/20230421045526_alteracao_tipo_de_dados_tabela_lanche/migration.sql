/*
  Warnings:

  - Changed the type of `horaAbre` on the `Lanche` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `horaFecha` on the `Lanche` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Lanche" DROP COLUMN "horaAbre",
ADD COLUMN     "horaAbre" TIMESTAMP(3) NOT NULL,
DROP COLUMN "horaFecha",
ADD COLUMN     "horaFecha" TIMESTAMP(3) NOT NULL;
