"use server";

import { convertZodErrors } from "@/app/_utils/errors";
import { dealSchema, TDeal } from "../../_schemas/deal";
import { DealFormState, StringMap } from "@/app/_types/deal";

export const formHandlerAction = async (
  prevState: DealFormState<TDeal>,
  formData: FormData,
): Promise<DealFormState<TDeal>> => {
  //uncomment to easily view loading state in submit button
  //await sleep(1000);

  const unvalidatedData: StringMap = {
    name: formData.get("name") as string,
    link: formData.get("link") as string,
    couponCode: formData.get("couponCode") as string,
    discount: formData.get("discount") as string,
  };

  const validated = dealSchema.safeParse(unvalidatedData);

  if (!validated.success) {
    const errors = convertZodErrors(validated.error);

    const dealData = {
      ...unvalidatedData,
      discount: Number(unvalidatedData.discount) || 10,
    } as TDeal;
    return {
      errors,
      data: dealData,
      // data: unvalidatedData,
      // // we can also return the unvalidated data, so that we can fill
      // the form with it, even if it's not valid, this way the user doesn't have
      // to fill the whole form again if there's an error
    };
  } else {
    return {
      successMsg: "Deal added successfully!",
      errors: {},
      // resetting back to default data
      data: {
        name: "",
        link: "",
        couponCode: "",
        discount: 10,
      },
    };
  }
};
