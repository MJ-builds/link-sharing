import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Devlinks | Layout" },
    {
      name: "description",
      content: "Layout Index",
    },
  ];
};

export default function Layout() {
  return (
    // background container
    <div className="flex h-screen w-full items-center justify-center bg-[#FAFAFA]">
      {/*  layout inner */}
      <div className="mx-auto flex h-auto w-auto self-start bg-[#FAFAFA] pt-10 md:self-center md:pt-0">
        <div className="flex flex-col gap-[51px]">
          <div className="justify-left flex pl-10 md:justify-center md:pl-0">
            <img src="/icons/logo-devlinks-large.svg" alt="logo" />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
