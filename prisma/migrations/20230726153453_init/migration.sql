-- CreateTable
CREATE TABLE "Invoices" (
    "id" SERIAL NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Invoices_pkey" PRIMARY KEY ("id")
);
