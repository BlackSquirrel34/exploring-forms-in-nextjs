import { signUpSchema } from "@/app/react-hook-form-b/_components/ExampleForm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: unknown = await request.json();

  // Validate data from request body again, serverside
  // signUpSchema.parse(body); // if the data is invalid, this will throw an error and the code below won't run, so we don't need to worry about that
  const result = signUpSchema.safeParse(body); // this one doesn't throw an error, it just returns an object with success: true or false, and if it's false, it also includes the errors, so we can handle that however we want

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  }

  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true },
  );
}
