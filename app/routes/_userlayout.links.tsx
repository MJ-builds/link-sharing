import { json } from "@remix-run/node";
import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/node";
import React, { useState } from "react";
import { Form, useActionData, useLoaderData } from "@remix-run/react";

import { Button } from "~/components/ui/button";
import EmptyLinkImage from "~/components/ui/icons/emptylinkimage";
import LinkIcon from "~/components/ui/icons/linkicon";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

// CONTEXT_TEST
import { requireAuthCookie } from "~/auth.server";
import { prisma } from "~/db/prisma";

// fine here for now
import platforms from "~/platforms/platforms.json";

import { z } from "zod";
import { parse } from "@conform-to/zod";

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

  // TODO: change name to be more uniform across loaders/actions
  const userLinksData = await prisma.userlinks.findUnique({
    where: { userId },
  });

  if (!userLinksData) {
    return json({ error: "no user links data" });
  }

  return json({ userLinksData });
}

const UserLinksSchema = z.object({
  platform: z.string({ required_error: "platform is required" }),
  link: z.string({ required_error: "link is required" }),
});

export async function action({ request }: ActionFunctionArgs) {
  let userId = await requireAuthCookie(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  const submission = parse(formData, {
    schema: UserLinksSchema,
  });

  if (!submission.value) {
    return json({ status: "error", submission } as const, { status: 400 });
  }

  const { platform, link } = submission.value;

  // Find the selected platform
  const selectedPlatform = platforms.find(
    (platform_) => platform_.name === platform,
  );
  // can probably improve this.
  if (!selectedPlatform) {
    return json(
      { status: "error", message: "Invalid platform selected" },
      { status: 400 },
    );
  }

  // Construct the full link based on the selected platform
  const fullLink = `${selectedPlatform.link}${link}`;

  // to work on and schema to add arrays / multiple entries
  await prisma.userlinks.upsert({
    where: { userId: userId },
    update: {
      platform: platform,
      link: fullLink,
      icon: selectedPlatform.icon,
      color: selectedPlatform.color,
    },
    create: {
      platform: platform,
      link: fullLink,
      icon: selectedPlatform.icon,
      color: selectedPlatform.color,
      userId: userId,
    },
  });

  if (intent === "delete") {
    await prisma.userlinks.delete({
      where: { userId: userId },
    });
    return json({ deleted: true });
  }

  return json({ message: "success" });
}

export function GetStartedBanner() {
  return (
    <div className="flex flex-col items-center gap-10 rounded-xl bg-[#FAFAFA] p-5 pb-10 pt-10">
      <EmptyLinkImage />
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-[32px] font-bold text-[#333333]">
          Let's get you started
        </h1>
        <p className="text-base text-[#737373] md:mx-20 md:text-center ">
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We're here to help you share
          your profiles with everyone!
        </p>
      </div>
    </div>
  );
}

export function GenerateLinks() {
  const { userLinksData } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const errors =
    actionData?.status === "error" ? actionData.submission.error : null;

  const [selectedPlatform, setSelectedPlatform] = useState(
    userLinksData?.platform,
  );
  return (
    <Form method="POST" id="linksForm">
      <div className="flex h-auto w-full rounded-xl bg-[#FAFAFA] text-[#737373]">
        <div className="flex w-full flex-col gap-3 p-5">
          <div className="flex justify-between">
            <div className="flex flex-row items-center font-bold">
              <div className="mr-2 flex flex-col gap-1">
                <div className="h-[1px] w-[12px] bg-[#737373]"></div>
                <div className="h-[1px] w-[12px] bg-[#737373]"></div>
              </div>
              Link #1
            </div>
            <Button
              className="text-base"
              type="submit"
              name="intent"
              value="delete"
            >
              Remove
            </Button>
          </div>
          <div className="flex flex-col">
            <p className="mb-1 text-xs">Platform</p>
            <Select
              name="platform"
              value={selectedPlatform}
              onValueChange={(value) => setSelectedPlatform(value)}
            >
              <SelectTrigger className="relative h-auto bg-white px-4 py-3  pl-10">
                <SelectValue placeholder="select platform" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                {platforms.map((platform, index) => (
                  <SelectItem
                    key={index}
                    value={platform.name}
                    className="border-b-[1px] border-b-[#D9D9D9] p-3 pl-10 focus:text-[#633CFF]"
                  >
                    <img
                      src={platform.icon}
                      alt={platform.name}
                      className="absolute left-3 top-1/2 -translate-y-1/2 transform "
                    />
                    {platform.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="text-xs text-red-700">
              {errors ? errors.platform : ""}
            </div>
          </div>
          <div className="flex flex-col ">
            <p className="mb-1 text-xs">Link</p>
            <div className="relative flex items-center justify-center text-center">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 transform" />
              <Input
                type="text"
                name="link"
                id="link"
                className="px-4 py-3 pl-10 text-base"
                defaultValue={userLinksData ? userLinksData?.link : null}
              />
            </div>
            <div className="text-xs text-red-700">
              {errors ? errors.link : ""}
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default function Links() {
  //unused for now - add in loader to then decide on whether to show links opener (when no links) or existing links tab.
  const { userLinksData } = useLoaderData<typeof loader>();

  const [enableLinks, setEnableLinks] = useState(false);

  return (
    <div className="flex h-full flex-col gap-10">
      <div>
        <h1 className="text-[32px] font-bold text-[#333333]">
          Customize your links
        </h1>
        <p className="text-base text-[#737373]">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
      </div>
      <Button
        className="border border-[#633CFF] text-base font-medium text-[#633CFF] hover:bg-[#EFEBFF]"
        onClick={() => setEnableLinks(true)}
      >
        + Add new link
      </Button>
      {/**
       * This component rendering is conditional.
       * - If 'enableLinks' is false and 'userLinksData' exists, it will render 'GenerateLinks' component.
       * - If 'enableLinks' is false and 'userLinksData' does not exist, it will render 'GetStartedBanner' component.
       * - If 'enableLinks' is true, it will always render the 'GenerateLinks' component.
       */}

      {/* NB THIS REMAINS BUGGED! Need to figure out an auto-refresh if we delete links */}
      {!enableLinks ? (
        userLinksData ? (
          <GenerateLinks />
        ) : (
          <GetStartedBanner />
        )
      ) : (
        <GenerateLinks />
      )}

      <div className="flex h-auto w-full items-end justify-end border-t-2 bg-white py-6">
        <Button
          type="submit"
          name="intent"
          value="save"
          form="linksForm"
          className="bg-[#633CFF] px-7 py-3 text-base font-medium text-white hover:bg-[#EFEBFF]"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
