/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `short_url` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "short_url_slug_key" ON "short_url"("slug");
