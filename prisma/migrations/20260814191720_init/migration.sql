-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'operator',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "heightCm" INTEGER NOT NULL,
    "springType" TEXT NOT NULL,
    "comfortLayer" TEXT NOT NULL,
    "firmness" TEXT NOT NULL,
    "firmnessPct" INTEGER NOT NULL,
    "fabric" TEXT NOT NULL,
    "cooling" BOOLEAN NOT NULL DEFAULT false,
    "hypoallergenic" BOOLEAN NOT NULL DEFAULT true,
    "warrantyYears" INTEGER NOT NULL DEFAULT 5,
    "trialDays" INTEGER NOT NULL DEFAULT 30,
    "deliveryNote" TEXT NOT NULL DEFAULT 'Pulsuz, yatağa qədər',
    "image" TEXT NOT NULL,
    "specLine" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "whoFor" TEXT NOT NULL DEFAULT '[]',
    "whoNot" TEXT,
    "layers" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "popular" BOOLEAN NOT NULL DEFAULT false,
    "showOnHome" BOOLEAN NOT NULL DEFAULT false,
    "showInCompare" BOOLEAN NOT NULL DEFAULT true,
    "includeInHotel" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "customSizeAllowed" BOOLEAN NOT NULL DEFAULT true,
    "depositPct" INTEGER NOT NULL DEFAULT 30,
    "customReturnable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Size" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "discountPrice" INTEGER,
    "stock" TEXT NOT NULL DEFAULT 'Sifarişlə',
    "leadTime" TEXT NOT NULL DEFAULT '2 gün',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Size_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "author" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 5,
    "text" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'published',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "data" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ChangeLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT,
    "message" TEXT NOT NULL,
    "author" TEXT NOT NULL DEFAULT 'Admin',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
