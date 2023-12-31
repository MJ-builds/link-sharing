import { type ActionFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Form, NavLink, useActionData } from "@remix-run/react";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";

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
  const name = formData.get("email") as String;
  console.log(name);
  return json({ name });
}

export default function Login() {
  const data = useActionData<typeof action>();
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
              className="mb-[3px] pl-10"
              // scuffed. Must change this
            />
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
              className="pl-10"
            />
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
