"use server";

import { revalidatePath } from "next/cache";
import db from "@/modules/db";
import { PostData } from "@/components/widgets/BatchForm";

export const handleGenerateData = async (postData: PostData) => {
  try {
    const batchRep = await db.batches.create({
      data: {
        model: postData.model,
        license_level: postData.license_level,
        batch_date: postData.batch_date,
        quantity: postData.quantity,
        batch_comment: postData.comment,
      },
    });

    const numbersPromises = Array.from({ length: postData.quantity }, () =>
      db.numbers
        .create({
          data: {
            batch_id: batchRep.id,
          },
        })
        .catch((err: any) => {
          console.error(err);
          throw err;
        }),
    );

    await Promise.all(numbersPromises);

    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/");
};
