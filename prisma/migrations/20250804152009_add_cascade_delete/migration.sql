-- DropForeignKey
ALTER TABLE "public"."Image" DROP CONSTRAINT "Image_petId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_petId_fkey" FOREIGN KEY ("petId") REFERENCES "public"."Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
