-- CreateTable
CREATE TABLE "profile" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(350) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "short_url" (
    "id" SERIAL NOT NULL,
    "profile_id" INTEGER,
    "name" VARCHAR(255),
    "original_url" VARCHAR(2048) NOT NULL,
    "slug" VARCHAR(6) NOT NULL,
    "hits" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "short_url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_email_key" ON "profile"("email");

-- CreateIndex
CREATE INDEX "profile_email_idx" ON "profile"("email");

-- CreateIndex
CREATE INDEX "short_url_slug_idx" ON "short_url"("slug");

-- AddForeignKey
ALTER TABLE "short_url" ADD CONSTRAINT "short_url_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
