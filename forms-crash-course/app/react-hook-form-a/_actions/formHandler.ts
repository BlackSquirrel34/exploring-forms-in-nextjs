"use server";

import { convertZodErrors } from "@/app/_utils/errors";
import { dealSchema, TDeal } from "../../_schemas/deal";
import { DealFormState } from "@/app/_types/deal";

// export const sleep = (ms: number) =>
//   new Promise((resolve) => setTimeout(resolve, ms));

export const hookformAction = async (
  deal: TDeal,
): Promise<DealFormState<TDeal>> => {
  //uncomment to easily view loading state in submit button
  //await sleep(1000);

  const validated = dealSchema.safeParse(deal);

  if (!validated.success) {
    const errors = convertZodErrors(validated.error);

    return {
      errors,
    };
  } else {
    return {
      successMsg: "Deal added successfully!",
    };
  }
};
