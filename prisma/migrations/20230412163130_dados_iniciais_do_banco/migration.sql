-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Lanche" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "logo" TEXT,
    "nome" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    CONSTRAINT "Lanche_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "lancheId" TEXT NOT NULL,
    CONSTRAINT "Endereco_lancheId_fkey" FOREIGN KEY ("lancheId") REFERENCES "Lanche" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Horario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "diaSemana" TEXT NOT NULL,
    "disponivel" BOOLEAN NOT NULL,
    "horaAbre" DATETIME NOT NULL,
    "horaFecha" DATETIME NOT NULL,
    "lancheId" TEXT NOT NULL,
    CONSTRAINT "Horario_lancheId_fkey" FOREIGN KEY ("lancheId") REFERENCES "Lanche" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cardapio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "lancheId" TEXT NOT NULL,
    CONSTRAINT "Cardapio_lancheId_fkey" FOREIGN KEY ("lancheId") REFERENCES "Lanche" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "cardapioId" TEXT NOT NULL,
    CONSTRAINT "Categoria_cardapioId_fkey" FOREIGN KEY ("cardapioId") REFERENCES "Cardapio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imagem" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "categoriaId" TEXT NOT NULL,
    CONSTRAINT "item_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Adicional" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "itemId" TEXT NOT NULL,
    CONSTRAINT "Adicional_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Lanche_id_idx" ON "Lanche"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Endereco_lancheId_key" ON "Endereco"("lancheId");

-- CreateIndex
CREATE INDEX "Endereco_id_idx" ON "Endereco"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Horario_lancheId_key" ON "Horario"("lancheId");

-- CreateIndex
CREATE UNIQUE INDEX "Cardapio_lancheId_key" ON "Cardapio"("lancheId");

-- CreateIndex
CREATE UNIQUE INDEX "item_categoriaId_key" ON "item"("categoriaId");
