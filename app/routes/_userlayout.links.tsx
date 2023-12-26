import {
  type LoaderFunctionArgs,
  MetaFunction,
  type ActionFunctionArgs,
  json,
} from "@remix-run/node";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import EmptyLinkImage from "~/components/ui/icons/emptylinkimage";
import LinkIcon from "~/components/ui/icons/linkicon";
import { Input } from "~/components/ui/input";

export const meta: MetaFunction = () => {
  return [
    { title: "Devlinks | Links" },
    {
      name: "description",
      content: "Layout Index",
    },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const platform = formData.get("platform");
  const link = formData.get("link");
  return json({ platform, link });
}

export function GetStartedBanner() {
  return (
    <div className="flex flex-col items-center p-5 gap-10 bg-[#FAFAFA] rounded-xl pt-10 pb-10">
      <EmptyLinkImage />
      <div className="flex flex-col items-center gap-6">
        <h1 className="font-bold text-[32px] text-[#333333]">
          Let's get you started
        </h1>
        <p className="text-[#737373] text-base md:text-center md:mx-20 ">
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We're here to help you share
          your profiles with everyone!
        </p>
      </div>
    </div>
  );
}

export function GenerateLinks() {
  return (
    <div className="flex w-full h-auto rounded-xl bg-[#FAFAFA] text-[#737373]">
      <div className="flex flex-col p-5 gap-3 w-full">
        <div className="flex justify-between">
          <div className="flex flex-row items-center font-bold">
            <div className="flex flex-col gap-1 mr-2">
              <div className="w-[12px] h-[1px] bg-[#737373]"></div>
              <div className="w-[12px] h-[1px] bg-[#737373]"></div>
            </div>
            Link #1
          </div>
          <div className="text-base">Remove</div>
        </div>
        <div className="flex flex-col">
          <p className="text-xs mb-1">Platform</p>
          <select className="px-4 py-3 rounded-lg border border-[#D9D9D9]">
            <option>GitHub</option>
          </select>
        </div>
        <div className="flex flex-col">
          <p className="text-xs mb-1">Link</p>
          <div className="relative flex items-center justify-center text-center">
            {/* <img
              src="/icons/icon-link.svg"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            /> */}
            <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input
              type="text"
              name="email"
              id="email"
              className="px-4 py-3 pl-10 text-base"
              // scuffed. Must change this
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Links() {
  // this state helps to show or hide the banner / links in the UI.
  const [enableLinks, setEnableLinks] = useState(false);

  return (
    // background container
    <div className="flex flex-col gap-10 ">
      <div>
        <h1 className="font-bold text-[32px] text-[#333333]">
          Customize your links
        </h1>
        <p className="text-[#737373] text-base">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
      </div>
      <Button
        className="text-base font-medium text-[#633CFF] border border-[#633CFF] hover:bg-[#EFEBFF]"
        onClick={() => setEnableLinks(true)}
      >
        + Add new link
      </Button>
      {/* insert get started here */}
      {!enableLinks ? <GetStartedBanner /> : <GenerateLinks />}

      <div className="flex justify-end w-full h-auto py-6 border-t-2 bg-white items-end">
        <Button className="text-base font-medium text-white hover:bg-[#EFEBFF] bg-[#633CFF] px-7 py-3">
          Save
        </Button>
      </div>
    </div>
  );
}
