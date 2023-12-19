import type { MetaFunction } from "@remix-run/node";
import { NavLink, Outlet, useMatches } from "@remix-run/react";
import EmptyPhone from "~/components/emptyphone";
import { Button } from "~/components/ui/button";
import LinkIcon from "~/components/ui/icons/linkicon";
import ProfileIcon from "~/components/ui/icons/profileicon";

export const meta: MetaFunction = () => {
  return [
    { title: "Devlinks | Home" },
    {
      name: "description",
      content: "Layout Index",
    },
  ];
};

export default function Layout() {
  let matches = useMatches();
  let isActiveLinks = matches.some((match) => match.pathname === "/links");
  let isActiveProfile = matches.some((match) => match.pathname === "/profile");
  return (
    // background container
    <div className="flex justify-center bg-[#FAFAFA] w-full h-screen text-[#737373]">
      {/*  layout inner */}
      <div className="flex flex-col w-full h-auto p-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-xl">
          <img src="/icons/logo-devlinks-large.svg" />
          <div className="flex self-center gap-4 w-auto ">
            <NavLink to="/links" prefetch="intent">
              <Button
                className={`md:min-w-[122px] gap-2 text-base font-medium hover:text-[#633CFF] ${
                  isActiveLinks ? "bg-[#EFEBFF] text-[#633CFF] " : ""
                }`}
              >
                <LinkIcon />
                Links
              </Button>
            </NavLink>
            <NavLink to="/profile" prefetch="intent">
              <Button
                className={`md:min-w-[187px] gap-2 text-base font-medium hover:text-[#633CFF] ${
                  isActiveProfile ? "bg-[#EFEBFF] text-[#633CFF] " : ""
                }`}
              >
                <ProfileIcon />
                Profile Details
              </Button>
            </NavLink>
          </div>
          <NavLink to="/preview" prefetch="intent">
            <Button className="text-base font-medium text-[#633CFF] border border-[#633CFF] hover:bg-[#EFEBFF]">
              Preview
            </Button>
          </NavLink>
        </div>
        <div className="flex flex-row w-full h-auto pt-6 gap-6">
          <div className="hidden lg:flex bg-white w-[800px] p-6 rounded-xl items-center justify-center h-auto">
            <EmptyPhone className="" />
          </div>
          <div className="flex flex-col bg-white w-full h-fit p-10 rounded-xl">
            {/* work on the right-side outlet here. */}
            {/* className="flex justify-end w-full h-auto py-6 bg-white" */}
            <div className="">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
