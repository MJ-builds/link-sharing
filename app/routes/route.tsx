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
    // background container
    <div className="flex justify-center items-center bg-[#FAFAFA] w-full h-screen">
      {/*  layout inner */}
      <div className="flex w-auto h-auto bg-[#FAFAFA] border">
        <div className="flex flex-col">
          <div className="flex justify-center">DEVLINKS</div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
