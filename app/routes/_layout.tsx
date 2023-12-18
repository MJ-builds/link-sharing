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
    <div className="flex justify-center items-center bg-[#FAFAFA] w- h-screen">
      {/*  layout inner */}
      <div className="flex w-auto h-auto bg-[#FAFAFA]">
        <div className="flex flex-col gap-[51px]">
          <div className="flex justify-center ">
            <img src="/icons/logo-devlinks-large.svg" />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
