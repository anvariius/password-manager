-- CreateEnum
CREATE TYPE "PasswordStatus" AS ENUM ('REMOVED', 'ACTIVE', 'EXPIRED');

-- CreateTable
CREATE TABLE "passwords" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "folderId" TEXT,
    "service" TEXT,
    "login" TEXT,
    "password" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastChange" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "PasswordStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "passwords_pkey" PRIMARY KEY ("id")
);
