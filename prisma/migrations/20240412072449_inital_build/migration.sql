-- CreateTable
CREATE TABLE "batches" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "batch_date" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "license_level" INTEGER NOT NULL,
    "batch_comment" TEXT,

    CONSTRAINT "batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "machine_numbers" (
    "id" SERIAL NOT NULL,
    "serial_number" TEXT NOT NULL,
    "batch_id" INTEGER NOT NULL,

    CONSTRAINT "machine_numbers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "batches_id_idx" ON "batches"("id");

-- CreateIndex
CREATE INDEX "machine_numbers_id_idx" ON "machine_numbers"("id");

-- AddForeignKey
ALTER TABLE "machine_numbers" ADD CONSTRAINT "machine_numbers_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "batches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
