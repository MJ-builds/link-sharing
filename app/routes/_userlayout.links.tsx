import {
  type LoaderFunctionArgs,
  MetaFunction,
  type ActionFunctionArgs,
  json,
} from "@remix-run/node";
import { Form } from "@remix-run/react";

import { useState } from "react";

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

// to be moved to JSON file or DB depending.
const platforms = [
  {
    name: "GitHub",
    icon: "/icons/icon-github.svg",
    link: "https://github.com/",
  },
  {
    name: "Twitter",
    icon: "/icons/icon-twitter.svg",
    link: "https://twitter.com/",
  },
  {
    name: "LinkedIn",
    icon: "/icons/icon-linkedin.svg",
    link: "https://linkedin.com/",
  },
  {
    name: "Codepen",
    icon: "/icons/icon-codepen.svg",
    link: "https://codepen.io/",
  },
  {
    name: "Codewars",
    icon: "/icons/icon-codewars.svg",
    link: "https://www.codewars.com/",
  },
];

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
  const [selectedPlatformName, setSelectedPlatformName] = useState("");
  const [userInput, setUserInput] = useState("");

  const selectedPlatform = platforms.find(
    (platform) => platform.name === selectedPlatformName,
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
            <div className="text-base">Remove</div>
          </div>
          <div className="flex flex-col">
            <p className="mb-1 text-xs">Platform</p>
            <Select
              name="platform"
              value={selectedPlatformName}
              onValueChange={setSelectedPlatformName}
            >
              <SelectTrigger className="relative h-auto bg-white px-4 py-3  pl-10">
                <SelectValue placeholder="Select Platform" />
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
          </div>
          <div className="flex flex-col ">
            <p className="mb-1 text-xs">Link</p>
            <div className="relative flex items-center justify-center text-center">
              {/* <img
              src="/icons/icon-link.svg"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            /> */}
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 transform" />
              <Input
                type="text"
                name="link"
                id="link"
                className="px-4 py-3 pl-10 text-base"
                value={
                  selectedPlatform
                    ? `${selectedPlatform.link}${userInput}`
                    : userInput
                }
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (
                    selectedPlatform &&
                    newValue.startsWith(selectedPlatform.link)
                  ) {
                    setUserInput(newValue.slice(selectedPlatform.link.length));
                  } else if (
                    selectedPlatform &&
                    !newValue.startsWith(selectedPlatform.link)
                  ) {
                    setUserInput("");
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default function Links() {
  // this state helps to show or hide the banner / links in the UI.
  const [enableLinks, setEnableLinks] = useState(false);

  return (
    // background container
    <div className="flex flex-col gap-10 ">
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

      {/* insert get started here */}
      {!enableLinks ? <GetStartedBanner /> : <GenerateLinks />}

      <div className="flex h-auto w-full items-end justify-end border-t-2 bg-white py-6">
        <Button
          type="submit"
          form="linksForm"
          className="bg-[#633CFF] px-7 py-3 text-base font-medium text-white hover:bg-[#EFEBFF]"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
