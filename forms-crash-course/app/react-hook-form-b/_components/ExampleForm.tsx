"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const signUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(10, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords need to match",
    // we need to connect this error to some field, or several
    path: ["confirmPassword"],
  });

// we can create a typescript type out of this to add morre type-safety
type TSignUpSchema = z.infer<typeof signUpSchema>;

export default function ExampleForm() {
  const {
    register,
    handleSubmit, //this one has e.preventDefault already included, as well as validation as we defined
    formState: { errors, isSubmitting },
    reset,
    setError, // this is useful for setting errors that come from the server, for example, if the email is already taken, we can set an error for the email field with this function
    // the type we infered helps us specify what the form will be
    // we now cannot register something with the wrong name any more,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: TSignUpSchema) => {
    // todos
    // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate an API call
    // sending data to api route with fetch
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (!response.ok) {
      alert("Submitting form failed!");
      return;
    }

    if (responseData.errors) {
      const errors = responseData.errors;
      if (errors.email) {
        setError("email", { type: "server", message: errors.email[0] });
      }
      if (errors.password) {
        setError("password", { type: "server", message: errors.password[0] });
      }
      if (errors.confirmPassword) {
        setError("confirmPassword", {
          type: "server",
          message: errors.confirmPassword[0],
        });
      } else {
        alert("Something went wrong!");
      }
    }
    alert("Form submitted successfully!");

    reset(); // Reset the form after submission. reactHookform gives us this function
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="px-4 py-2 rounded border border-blue-500 "
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{`${errors.email.message}`}</p>
      )}
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="px-4 py-2 rounded border border-blue-500 "
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{`${errors.password.message}`}</p>
      )}
      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="ConfirmPassword"
        className="px-4 py-2 rounded border border-blue-500 "
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{`${errors.confirmPassword.message}`}</p>
      )}
      <button
        disabled={isSubmitting}
        type="submit"
        className="bg-blue-500 disabled:bg-blue-300 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
