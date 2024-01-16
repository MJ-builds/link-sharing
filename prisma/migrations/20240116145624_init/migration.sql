/*
  Warnings:

  - Added the required column `color` to the `Userlinks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Userlinks` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Userlinks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "platform" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Userlinks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Userlinks" ("id", "link", "platform", "userId") SELECT "id", "link", "platform", "userId" FROM "Userlinks";
DROP TABLE "Userlinks";
ALTER TABLE "new_Userlinks" RENAME TO "Userlinks";
CREATE UNIQUE INDEX "Userlinks_userId_key" ON "Userlinks"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
