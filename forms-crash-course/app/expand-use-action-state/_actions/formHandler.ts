"use server";

import { resolve } from "path";

// whenever using an action with useAction state, the action needs to take specific parameters:
// 1. The previous state of the form,
// which is useful for keeping the form data in case of an error, so user doesn't have to fill the whole form again.
// prevState can be any state we defined when declaring the hook for our initial state
// so we can control what this state is gonna be and use prevState to do things iwthing the body of the function, as well as return it

// 2. The form data being submitted in the form, coming in the form of a FormData object,
// which is a built-in object in JavaScript that allows us to easily access the submitted data.

export async function FormAction(prevState: unknown, formData: FormData) {
  // we're no longer using prevState any more, so any/ unknown is ok

  //simulating delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const username = formData.get("name") as string;

  if (username.length < 3) {
    return {
      success: false,
      message: "Username must be at least 3 characters long",
    };
  }

  return {
    success: true,
    message: `Username updated to ${username}`,
  };
}
