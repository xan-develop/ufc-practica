CREATE TABLE "peso"(
    "id" INTEGER NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "campeon" INTEGER NOT NULL
);
ALTER TABLE
    "peso" ADD PRIMARY KEY("id");
CREATE TABLE "arbitro"(
    "id" INTEGER NOT NULL,
    "nombre" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "arbitro" ADD PRIMARY KEY("id");
CREATE TABLE "evento"(
    "id" INTEGER NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "localizacion" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "evento" ADD PRIMARY KEY("id");
CREATE TABLE "luchador"(
    "id" INTEGER NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "edad" INTEGER NOT NULL,
    "especialidad" VARCHAR(255) NOT NULL,
    "victorias" INTEGER NOT NULL,
    "derrotas" INTEGER NOT NULL,
    "nacionalidad" VARCHAR(255) NOT NULL,
    "idpeso" INTEGER NOT NULL,
    "imagen" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "luchador" ADD PRIMARY KEY("id");
COMMENT
ON COLUMN
    "luchador"."idpeso" IS 'clave foranea';
CREATE TABLE "combate"(
    "id" INTEGER NOT NULL,
    "luchador1" INTEGER NOT NULL,
    "luchador2" INTEGER NOT NULL,
    "idarbitro" INTEGER NOT NULL,
    "idevento" INTEGER NOT NULL,
    "victoria" INTEGER NOT NULL
);
ALTER TABLE
    "combate" ADD PRIMARY KEY("id");
ALTER TABLE
    "combate" ADD CONSTRAINT "combate_luchador2_foreign" FOREIGN KEY("luchador2") REFERENCES "luchador"("id");
ALTER TABLE
    "luchador" ADD CONSTRAINT "luchador_idpeso_foreign" FOREIGN KEY("idpeso") REFERENCES "peso"("id");
ALTER TABLE
    "combate" ADD CONSTRAINT "combate_idarbitro_foreign" FOREIGN KEY("idarbitro") REFERENCES "arbitro"("id");
ALTER TABLE
    "combate" ADD CONSTRAINT "combate_luchador1_foreign" FOREIGN KEY("luchador1") REFERENCES "luchador"("id");
ALTER TABLE
    "combate" ADD CONSTRAINT "combate_idevento_foreign" FOREIGN KEY("idevento") REFERENCES "evento"("id");