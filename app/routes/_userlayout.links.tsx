import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import EmptyLinkImage from "~/components/ui/icons/emptylinkimage";

export const meta: MetaFunction = () => {
  return [
    { title: "Devlinks | Links" },
    {
      name: "description",
      content: "Layout Index",
    },
  ];
};

export default function Links() {
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
      <Button className="text-base font-medium text-[#633CFF] border border-[#633CFF] hover:bg-[#EFEBFF]">
        + Add new link
      </Button>
      {/* unsure about the p-5 here */}
      <div className="flex flex-col items-center p-5 gap-10 bg-[#FAFAFA] rounded-xl pt-10 pb-10">
        <EmptyLinkImage />
        <div className="flex flex-col items-center gap-6">
          <h1 className="font-bold text-[32px] text-[#333333]">
            Let's get you started
          </h1>
          <p className="text-[#737373] text-base md:text-center md:mx-20 ">
            Use the “Add new link” button to get started. Once you have more
            than one link, you can reorder and edit them. We're here to help you
            share your profiles with everyone!
          </p>
        </div>
      </div>
      <div className="flex justify-end w-full h-auto py-6 border-t-2 bg-white items-end">
        <Button className="text-base font-medium text-white hover:bg-[#EFEBFF] bg-[#633CFF] px-7 py-3">
          Save
        </Button>
      </div>
    </div>
  );
}
