"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import SubmitButton from "@/app/components/SubmitButton";
import { dealSchema, TDeal } from "@/app/_schemas/deal";
import { hookformAction } from "../_actions/formHandler";

export default function HookForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TDeal>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      name: "",
      link: "",
      couponCode: "",
      discount: 10,
    },
    mode: "onChange",
  });

  const onSubmit = async (deal: TDeal) => {
    const { successMsg } = await hookformAction(deal);
    if (successMsg) {
      toast.success(successMsg);
    }
  };

  return (
    <form className="max-w-2xl" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-4">
        <div>
          <label className="block " htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full p-2 rounded-md text-gray-900 border-black border-2"
            {...register("name")}
          />
          <div className="h-8">
            {errors?.name && (
              <small className="text-red-400">{errors.name.message}</small>
            )}
          </div>
        </div>
        <div>
          <label className="block " htmlFor="link">
            Link
          </label>
          <input
            type="text"
            id="link"
            title="Please enter a valid url"
            className="w-full p-2 rounded-md text-gray-900 border-black border-2"
            aria-required
            {...register("link")}
          />
          <div className="h-8">
            {errors?.link && (
              <small className="text-red-400">{errors.link.message}</small>
            )}
          </div>
        </div>
        <div>
          <label className="block " htmlFor="couponCode">
            Coupon Code
          </label>
          <input
            type="text"
            id="couponCode"
            minLength={5}
            className="w-full p-2 rounded-md text-gray-900 border-black border-2"
            aria-required
            {...register("couponCode")}
          />
          <div className="h-8">
            {errors?.couponCode && (
              <small className="text-red-400">
                {errors.couponCode.message}
              </small>
            )}
          </div>
        </div>
        <div>
          <label className="block " htmlFor="discount">
            Discount (%)
          </label>
          <input
            type="number"
            id="discount"
            min={1}
            max={99}
            className="w-full p-2 rounded-md text-gray-900 border-black border-2"
            aria-required
            {...register("discount")}
          />
          <div className="h-8">
            {errors?.discount && (
              <small className="text-red-400">{errors.discount.message}</small>
            )}
          </div>
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
