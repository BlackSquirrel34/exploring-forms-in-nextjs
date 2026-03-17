"use client";
import { useFormState } from "react-dom";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { formHandlerAction } from "../_actions/formHandler";
import { DealFormState, StringMap } from "@/app/_types/deal";
import SubmitButton from "@/app/components/SubmitButton";
import { dealSchema, TDeal } from "@/app/_schemas/deal";
import { convertZodErrors } from "@/app/_utils/errors";

// this is of the type our action will return
const initialState: DealFormState<TDeal> = {};

const initialData: TDeal = {
  name: "",
  link: "",
  couponCode: "",
  discount: 10,
};

export default function DealForm() {
  const [serverState, formAction] = useFormState(
    formHandlerAction,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  // we migth want to keep track of errors
  const [errors, setErrors] = useState<StringMap>({});

  // as well as keep track fo blurs
  const [blurs, setBlurs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (serverState.successMsg) {
      toast.success(serverState.successMsg);
      formRef.current?.reset();
    }
  }, [serverState]);

  // as well as keep track of the deal. ensure this is after we defined serverState
  const [deal, setDeal] = useState<TDeal>(serverState.data || initialData);

  // anytime something is blurred we're update to tarack everything blurred
  const handleOnblur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setBlurs((prev) => ({ ...prev, [name]: true }));

    // this is for building client-side validation manually instead using react-hook-form
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setDeal((prev) => {
        const updatedData = { ...prev, [name]: value };
        const validated = dealSchema.safeParse(updatedData);

        if (validated.success) {
          setErrors({});
        } else {
          const errors = convertZodErrors(validated.error);
          setErrors(errors);
        }
        return updatedData;
      });
    };

    // this one has progressive enhancement built in, so if javascript is disabled,
    // it will still work, it will just do a full page reload instead of an ajax request, and we will lose the nice toast message and the fact that the form doesn't reset on error, but it will still work

    return (
      <form action={formAction} ref={formRef}>
        <div className="flex flex-col gap-y-4">
          <div>
            <label className="block " htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required={true}
              onBlur={handleOnblur}
              onChange={handleOnChange}
              defaultValue={serverState.data?.name}
              className="w-full p-2 rounded-md text-gray-900 border-black border-2"
              value={deal.name}
            />
            <div className="h-8">
              {serverState.errors?.name && (
                <small className="text-red-400">
                  {serverState.errors.name}
                </small>
              )}
            </div>
          </div>
          <div>
            <label className="block " htmlFor="link">
              Link
            </label>
            <input
              type="text"
              name="link"
              id="link"
              required={true}
              onBlur={handleOnblur}
              onChange={handleOnChange}
              pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
              title="Please enter a valid url"
              defaultValue={serverState.data?.link}
              className="w-full p-2 rounded-md text-gray-900 border-black border-2"
              value={deal.link}
            />
            <div className="h-8">
              {serverState.errors?.link && (
                <small className="text-red-400">
                  {serverState.errors.link}
                </small>
              )}
            </div>
          </div>
          <div>
            <label className="block " htmlFor="couponCode">
              Coupon Code
            </label>
            <input
              type="text"
              name="couponCode"
              id="couponCode"
              required={true}
              onBlur={handleOnblur}
              onChange={handleOnChange}
              minLength={5}
              defaultValue={serverState.data?.couponCode}
              className="w-full p-2 rounded-md text-gray-900 border-black border-2"
              value={deal.couponCode}
            />
            <div className="h-8">
              {serverState.errors?.couponCode && (
                <small className="text-red-400">
                  {serverState.errors.couponCode}
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
              name="discount"
              id="discount"
              required={true}
              onBlur={handleOnblur}
              onChange={handleOnChange}
              min={1}
              max={99}
              defaultValue={serverState.data?.discount || 10}
              className="w-full p-2 rounded-md text-gray-900 border-black border-2"
              value={deal.discount}
            />
            <div className="h-8">
              {serverState.errors?.discount && (
                <small className="text-red-400">
                  {serverState.errors.discount}
                </small>
              )}
            </div>
          </div>
          <SubmitButton />
        </div>
      </form>
    );
  };
}
