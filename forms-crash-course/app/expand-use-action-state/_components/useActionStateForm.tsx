"use client";
import { useActionState } from "react";
import { FormAction } from "../_actions/formHandler";

export default function UseActionStateForm() {
  // useActionState has three arguments:
  // 1. The action function that will be called when the form is submitted. an async function that returns data that will come directly into the state variable.
  // 2. The initial value in the form -- can be undefined, but we need to provide a specific value.
  // 3. An optional initial state object, which can be used to set the initial values of the form fields.
  const [state, formAction, isPending] = useActionState(FormAction, undefined);

  return (
    <form
      action={formAction}
      className="flex flex-col max-w-sm gap-4 items-center"
    >
      <input
        type="text"
        name="name"
        placeholder="Your name"
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>
      {state?.success && (
        <p className="text-green-500">Form submitted successfully!</p>
      )}
      {state?.message && !state?.success && (
        <p className="text-red-500">Form submission failed: {state.message}</p>
      )}
    </form>
  );
}
