/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Pet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pet_name_key" ON "public"."Pet"("name");
