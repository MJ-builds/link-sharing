import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  NavLink,
  Outlet,
  useActionData,
  useLoaderData,
  useMatches,
} from "@remix-run/react";
import { Button } from "~/components/ui/button";
import LinkIcon from "~/components/ui/icons/linkicon";
import ProfileIcon from "~/components/ui/icons/profileicon";

import { authCookie } from "~/auth.server";

// for emptyphone
import { FC } from "react";

interface LinkIconProps {
  className?: string;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Devlinks | Home" },
    {
      name: "description",
      content: "Layout Index",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  let cookieString = request.headers.get("Cookie");
  let userId = await authCookie.parse(cookieString);
  console.log(userId);
  return { userId };
}

export const EmptyPhone: FC<
  LinkIconProps & { color: string; selectedPlatformName: string; icon: string }
> = ({ className, color, selectedPlatformName, icon }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="308"
    height="632"
    fill="none"
    viewBox="0 0 308 632"
  >
    <path
      stroke="#737373"
      d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
    />
    <path
      fill="#fff"
      stroke="#737373"
      d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
    />
    <circle cx="153.5" cy="112" r="48" fill="#EEE" />
    <rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8" />
    <rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4" />

    <rect width="237" height="44" x="35" y="278" fill={color} rx="8" />
    <g transform="translate(35, 278)">
      {/* Icon aligned with the left edge of the rectangle */}
      <image href={icon} width="24" height="24" y="10" />{" "}
      {/* y is half the height of the rect minus half the height of the icon */}
      {/* Text element positioned to the right of the icon */}
      <text
        className="fixed text-sm"
        x="34" // 24px (icon width) + 10px (desired gap)
        y="22" // Half the height of the rect
        fill="black"
        dominantBaseline="central"
        textAnchor="start" // Align text to the start of the x position
      >
        {selectedPlatformName}
      </text>
    </g>

    <rect width="237" height="44" x="35" y="342" fill="#EEE" rx="8" />
    <rect width="237" height="44" x="35" y="406" fill="#EEE" rx="8" />
    <rect width="237" height="44" x="35" y="470" fill="#EEE" rx="8" />
    <rect width="237" height="44" x="35" y="534" fill="#EEE" rx="8" />
  </svg>
);

// CONTEXT_TEST
import { createContext, useContext, useState } from "react";

// CONTEXT_TEST: Create a context for the color state
export const ColorContext = createContext({
  color: "#FFF", // default color
  setColor: (color: string) => {},
  selectedPlatformName: "",
  setSelectedPlatformName: (selectedPlatformName: string) => {},
  icon: "",
  setIcon: (setIcon: string) => {},
});

export default function Layout() {
  let matches = useMatches();
  let isActiveLinks = matches.some((match) => match.pathname === "/links");
  let isActiveProfile = matches.some((match) => match.pathname === "/profile");

  // CONTEXT_TEST
  const [color, setColor] = useState("#FFF");
  const [selectedPlatformName, setSelectedPlatformName] = useState("");
  const [icon, setIcon] = useState("");

  const { userId } = useLoaderData<typeof loader>();

  return (
    <ColorContext.Provider
      value={{
        color,
        setColor,
        selectedPlatformName,
        setSelectedPlatformName,
        icon,
        setIcon,
      }}
    >
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
            <div className="flex">
              <NavLink to="/preview" prefetch="intent">
                <Button className="border border-[#633CFF] text-base font-medium text-[#633CFF] hover:bg-[#EFEBFF]">
                  Preview
                </Button>
              </NavLink>
              {userId ? (
                <form method="POST" action="/logout">
                  <Button
                    className="gap-2 text-base font-medium text-[#633CFF] hover:text-[#633CFF] md:min-w-[120px]"
                    type="submit"
                  >
                    Logout
                  </Button>
                </form>
              ) : null}
            </div>
          </div>
          <div className="flex h-auto w-full flex-row gap-6 pt-6">
            <div className="hidden h-auto w-[800px] items-center justify-center rounded-xl bg-white p-6 lg:flex">
              <EmptyPhone
                color={color}
                selectedPlatformName={selectedPlatformName}
                icon={icon}
              />
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
    </ColorContext.Provider>
  );
}
