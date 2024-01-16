import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { json } from "react-router";

import { requireAuthCookie } from "~/auth.server";
import { Button } from "~/components/ui/button";
import UploadImageIcon from "~/components/ui/icons/uploadimageicon";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { prisma } from "~/db/prisma";
import { fullNameValidate } from "~/lib/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "Devlinks | Links" },
    {
      name: "description",
      content: "Layout Index",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  let userId = await requireAuthCookie(request);
  const userData = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  });
  return json({ userData });
}

export async function action({ request }: ActionFunctionArgs) {
  let userId = await requireAuthCookie(request);
  const formData = await request.formData();
  const firstName = String(formData.get("firstName"));
  const lastName = String(formData.get("lastName"));

  let errors = await fullNameValidate(firstName, lastName);
  if (errors) {
    return json({ errors }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: userId },
    data: { firstName, lastName },
  });

  return json({ success: "Profile updated successfully" });
}

export default function Profile() {
  const { userData } = useLoaderData<typeof loader>();
  const { firstName, lastName, email } = userData;

  const actionData = useActionData<typeof action>();
  let firstNameErrors = actionData?.errors?.firstName;
  let lastNameErrors = actionData?.errors?.lastName;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-[#333333]">
          Profile Details
        </h1>
        <p className="text-base text-[#737373]">
          Add your details to create a personal touch to your profile.
        </p>
      </div>
      <Form method="POST" id="profileForm">
        <div className="flex flex-col gap-6">
          <div className="flex h-auto w-full justify-center gap-3 rounded-xl bg-[#FAFAFA] p-5">
            <div className="grid h-auto w-full grid-cols-3 gap-4">
              <div className="flex flex-1 items-center justify-start">
                Profile picture
              </div>
              <div className="flex h-[193px] flex-1 flex-col items-center justify-center gap-2 rounded-xl bg-[#EFEBFF] font-semibold text-[#633CFF]">
                <UploadImageIcon />
                <div className="">+ Upload Image</div>
              </div>

              <div className="flex h-auto flex-1 flex-col justify-center pl-2 text-start text-xs">
                <div>Image must be below 1024x1024px.</div>
                <div>Use PNG or JPG format.</div>
              </div>
            </div>
          </div>
          <div className="flex h-auto w-full justify-center gap-3 rounded-xl bg-[#FAFAFA] p-5">
            <div className="flex w-full flex-col gap-3">
              <div className="flex flex-row items-center gap-4">
                {" "}
                <Label
                  className="flex w-full text-start text-base font-normal"
                  htmlFor="firstName"
                >
                  First name*
                </Label>
                <div className="relative flex w-full min-w-[66%] flex-row  items-center justify-center gap-4 text-center">
                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    defaultValue={firstName ? firstName : ""}
                    placeholder="e.g. John"
                    className={`flex ${
                      firstNameErrors
                        ? "border-[#FF3939] focus:border-[#FF3939]"
                        : ""
                    }`}
                  />
                  <span className="absolute right-3 text-xs text-[#FF3939]">
                    {firstNameErrors}
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                {" "}
                <Label
                  className="flex w-full text-start text-base font-normal"
                  htmlFor="lastName"
                >
                  Last name*
                </Label>
                <div className="relative flex w-full min-w-[66%] flex-row  items-center justify-center gap-4 text-center">
                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    defaultValue={lastName ? lastName : ""}
                    placeholder="e.g. Appleseed"
                    className={`flex  ${
                      lastNameErrors
                        ? "border-[#FF3939] focus:border-[#FF3939]"
                        : ""
                    }`}
                  />
                  <span className="absolute right-3 text-xs text-[#FF3939]">
                    {lastNameErrors}
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                {" "}
                <Label
                  className="flex w-full text-start text-base font-normal"
                  htmlFor="email"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={email}
                  disabled={true}
                  placeholder="e.g. email@example.com"
                  className="flex min-w-[66%]"
                />
              </div>
            </div>
          </div>
        </div>
      </Form>
      <div className="flex h-auto w-full items-end justify-end border-t-2 bg-white py-6">
        <Button
          type="submit"
          form="profileForm"
          className="bg-[#633CFF] px-7 py-3 text-base font-medium text-white hover:bg-[#EFEBFF]"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
