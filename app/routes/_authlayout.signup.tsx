import { redirect } from "@remix-run/node";
import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";

import { Form, NavLink, useActionData } from "@remix-run/react";

import { signupValidate } from "~/lib/utils";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { authCookie } from "~/auth.server";
import { createAccount } from "./_queries";

export const meta: MetaFunction = () => {
  return [
    { title: "Devlinks | Signup" },
    {
      name: "description",
      content: "Create an account to start creating!",
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const confirmPassword = String(formData.get("confirm-password"));

  let errors = await signupValidate(email, password, confirmPassword);
  if (errors) {
    return { errors };
  }
  let user = await createAccount(email, password);
  return redirect("/profile", {
    headers: {
      "Set-Cookie": await authCookie.serialize(user.id),
    },
  });
}

export default function Signup() {
  const actionData = useActionData<typeof action>();
  let emailError = actionData?.errors?.email;
  let passwordError = actionData?.errors?.password;

  return (
    // added w-screen for mobile but amend
    <div className="w-screen rounded-xl bg-[#FFFFFF] p-10 md:w-full">
      <div>
        <h1 className="text-[32px] font-bold">Create account</h1>
        <p className="mb-10 text-base text-[#737373]">
          Let's get you started sharing your links!
        </p>
      </div>

      <Form method="POST" className="flex flex-col gap-6">
        <div>
          <Label className="text-xs font-normal" htmlFor="email">
            Email address
          </Label>
          <div className="relative flex items-center justify-center text-center">
            <img
              src="/icons/icon-email.svg"
              className="absolute left-3 top-1/2 -translate-y-1/2 transform"
            />
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="e.g. alex@email.com"
              className={`mb-[3px] pl-10 ${
                emailError ? "border-[#FF3939] focus:border-[#FF3939]" : ""
              }`}
            />
            <span className="absolute right-3 text-xs text-[#FF3939]">
              {emailError}
            </span>
          </div>
        </div>
        <div>
          <Label className="text-xs font-normal" htmlFor="password">
            Password
          </Label>
          <div className="relative flex items-center justify-center text-center">
            <img
              src="/icons/icon-password.svg"
              className="absolute left-3 top-1/2 -translate-y-1/2 transform"
            />
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="At least 8 characters"
              className={`pl-10 ${
                emailError ? "border-[#FF3939] focus:border-[#FF3939]" : ""
              }`}
            />
            <span className="absolute right-3 text-xs text-[#FF3939]">
              {passwordError}
            </span>
          </div>
        </div>
        <div>
          <Label className="text-xs font-normal" htmlFor="confirm-password">
            Confirm password
          </Label>
          <div className="relative flex items-center justify-center text-center">
            <img
              src="/icons/icon-password.svg"
              className="absolute left-3 top-1/2 -translate-y-1/2 transform"
            />
            <Input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="At least 8 characters"
              className={`pl-10 ${
                emailError ? "border-[#FF3939] focus:border-[#FF3939]" : ""
              }`}
            />
            <span className="absolute right-3 text-xs text-[#FF3939]">
              {passwordError}
            </span>
          </div>
        </div>
        <p className="text-xs text-[#737373]">
          Password must contain at least 8 characters
        </p>
        <Button
          // change the min-w here and make it more central / less obscure to get the rest of the page this w
          className="h-12 min-w-full bg-[#633CFF] text-base font-medium text-white md:min-w-[396px]"
          variant="outline"
        >
          Create new account
        </Button>
      </Form>
      <p className="flex justify-center pt-6 text-base font-normal text-[#737373]">
        Already have an account?
        <NavLink className="ml-1 text-[#633CFF]" to="/signin" prefetch="intent">
          Login
        </NavLink>
      </p>
    </div>
  );
}
