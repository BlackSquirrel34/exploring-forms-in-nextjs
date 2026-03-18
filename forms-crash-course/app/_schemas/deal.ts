import { z } from "zod";

export const dealSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" }),
  link: z
    .string({ message: "Link is required" })
    .url({ message: "Link must be a valid URL" }),
  couponCode: z
    .string({ message: "Coupon code is required" })
    .min(5, { message: "Coupon code must be at least 5 characters" }),
  discount: z
    .number({
      message: "Discount must be a number",
    })
    .min(1, { message: "Discount must be at least 1%" })
    .max(100, { message: "Discount cannot be more than 100%" }),
});

export type TDeal = z.infer<typeof dealSchema>;
