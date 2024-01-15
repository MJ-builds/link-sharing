import {
  type ActionFunctionArgs,
  MetaFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Form, NavLink, useActionData } from "@remix-run/react";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { signinValidate } from "~/lib/utils";
import { login } from "./_queries";
import { authCookie } from "~/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Devlinks | Login" },
    {
      name: "description",
      content: "Login to start creating!",
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  let errors = await signinValidate(email, password);
  if (errors) {
    return json({ errors }, { status: 400 });
  }
  let userId = await login(email, password);
  if (!userId) {
    return json(
      { errors: { email: "Invalid email or password" } },
      { status: 400 },
    );
  }
  return redirect("/profile", {
    headers: {
      "Set-Cookie": await authCookie.serialize(userId),
    },
  });
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  let emailError = actionData?.errors?.email;
  return (
    <div className="w-screen rounded-xl bg-[#FFFFFF] p-10 md:w-full">
      <div>
        <h1 className="text-[32px] font-bold">Login</h1>
        <p className="mb-10 text-base text-[#737373]">
          Add your details below to get back into the app
        </p>
      </div>

      <Form method="POST" className="flex flex-col gap-6">
        <div>
          <Label className="text-xs font-normal " htmlFor="email">
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
              placeholder="Enter your password"
              className={`pl-10 ${
                emailError ? "border-[#FF3939] focus:border-[#FF3939]" : ""
              }`}
            />
            <span className="absolute right-3 text-xs text-[#FF3939]">
              {emailError}
            </span>
          </div>
        </div>
        <Button
          className="h-12 bg-[#633CFF] text-base font-medium text-white"
          variant="outline"
        >
          Login
        </Button>
      </Form>
      <p className="flex justify-center pt-6 text-base font-normal text-[#737373]">
        Don't have an account?
        <NavLink className="ml-1 text-[#633CFF]" to="/signup" prefetch="intent">
          Create account
        </NavLink>
      </p>
    </div>
  );
}
