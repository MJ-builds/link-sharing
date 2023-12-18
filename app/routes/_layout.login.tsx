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
      content: "Welcome to Devlinks! Login to start creating!",
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
    <div className="bg-[#FFFFFF] p-10 rounded-xl w-screen md:w-full">
      <div>
        <h1 className="font-bold text-[32px]">Login</h1>
        <p className="text-[#737373] text-base mb-10">
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
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="e.g. alex@email.com"
              className="pl-10 mb-[5px]"
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
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
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
          className="bg-[#633CFF] font-medium text-white text-base h-12"
          variant="outline"
        >
          Login
        </Button>
      </Form>
      <p className="pt-6 text-base font-normal text-[#737373] flex justify-center">
        Don't have an account?
        <NavLink className="ml-1 text-[#633CFF]" to="/signup">
          Create account
        </NavLink>
      </p>
    </div>
  );
}
