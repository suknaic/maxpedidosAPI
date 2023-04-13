/*
  Warnings:

  - You are about to drop the column `nome` on the `Cardapio` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cardapio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lancheId" TEXT NOT NULL,
    CONSTRAINT "Cardapio_lancheId_fkey" FOREIGN KEY ("lancheId") REFERENCES "Lanche" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cardapio" ("id", "lancheId") SELECT "id", "lancheId" FROM "Cardapio";
DROP TABLE "Cardapio";
ALTER TABLE "new_Cardapio" RENAME TO "Cardapio";
CREATE UNIQUE INDEX "Cardapio_lancheId_key" ON "Cardapio"("lancheId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
