import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { NavLink, Outlet, useActionData, useMatches } from "@remix-run/react";
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
    <div className="flex h-screen w-full justify-center bg-[#FAFAFA] text-[#737373]">
      {/*  layout inner */}
      <div className="flex h-auto w-full flex-col p-6">
        <div className="flex items-center justify-between rounded-xl bg-white p-4">
          <img src="/icons/logo-devlinks-large.svg" />
          <div className="flex w-auto gap-4 self-center ">
            <NavLink to="/links" prefetch="intent">
              <Button
                className={`gap-2 text-base font-medium hover:text-[#633CFF] md:min-w-[122px] ${
                  isActiveLinks ? "bg-[#EFEBFF] text-[#633CFF] " : ""
                }`}
              >
                <LinkIcon />
                Links
              </Button>
            </NavLink>
            <NavLink to="/profile" prefetch="intent">
              <Button
                className={`gap-2 text-base font-medium hover:text-[#633CFF] md:min-w-[187px] ${
                  isActiveProfile ? "bg-[#EFEBFF] text-[#633CFF] " : ""
                }`}
              >
                <ProfileIcon />
                Profile Details
              </Button>
            </NavLink>
          </div>
          <NavLink to="/preview" prefetch="intent">
            <Button className="border border-[#633CFF] text-base font-medium text-[#633CFF] hover:bg-[#EFEBFF]">
              Preview
            </Button>
          </NavLink>
        </div>
        <div className="flex h-auto w-full flex-row gap-6 pt-6">
          <div className="hidden h-auto w-[800px] items-center justify-center rounded-xl bg-white p-6 lg:flex">
            <EmptyPhone className="" />
          </div>
          <div className="flex h-fit w-full flex-col rounded-xl bg-white p-10">
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
