"use server";

import { dealSchema } from "../../_schemas/deal";
import { DealFormState } from "../../_types/deal";
import { convertZodErrors } from "../../_utils/errors";

export const formHandlerAction = async (
  formData: FormData,
): Promise<DealFormState<undefined>> => {
  const unvalidatedDeal = {
    name: formData.get("name") as string,
    link: formData.get("link") as string,
    couponCode: formData.get("couponCode") as string,
    discount: formData.get("discount") as string,
  };

  // safeParse means it will return an object, but not throw an error if validation fails.
  // Instead, it will return an object with a success property that is either true or false
  const validated = dealSchema.safeParse(unvalidatedDeal);

  if (!validated.success) {
    console.log("validation failed", validated.error);
    const errors = convertZodErrors(validated.error);
    return { errors };
  } else {
    return { successMsg: "Deal added successfully!", errors: {} };
  }
};
