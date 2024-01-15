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

export default function Route() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#FAFAFA]">
      {/*  layout inner */}
      <div className="flex h-auto w-auto border bg-[#FAFAFA]">
        <div className="flex flex-col">
          <div className="flex justify-center">DEVLINKS</div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
