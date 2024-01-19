import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useMatches,
} from "@remix-run/react";
import { Button } from "~/components/ui/button";
import LinkIcon from "~/components/ui/icons/linkicon";
import ProfileIcon from "~/components/ui/icons/profileicon";

import { requireAuthCookie } from "~/auth.server";

import { prisma } from "~/db/prisma";

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
  // get the user id from the cookie
  // previously had authCookie here instead of requireAuthCookie
  let userId = await requireAuthCookie(request);

  if (!userId) {
    return json({ error: "error" });
  }

  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      profileImage: true,
    },
  });
  if (!userData) {
    return json({ error: "User data not found" });
  }

  // this will be changed to findMany perhaps later when multiple links added?
  const userLinks = await prisma.userlinks.findUnique({
    where: { userId },
  });

  if (!userLinks) {
    return json({ error: "User links not found" });
  }

  return json({
    userId,
    userData,
    userLinks,
  });
}

export function EmptyPhone() {
  const { userData } = useLoaderData<typeof loader>();
  const { userLinks } = useLoaderData<typeof loader>();

  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="308"
        height="632"
        fill="none"
        viewBox="0 0 308 632"
      >
        {/* Your SVG paths here */}
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
        {!userLinks ? (
          <>
            <rect width="237" height="44" x="35" y="278" fill="#EEE" rx="8" />
            <rect width="237" height="44" x="35" y="342" fill="#EEE" rx="8" />
            <rect width="237" height="44" x="35" y="406" fill="#EEE" rx="8" />
            <rect width="237" height="44" x="35" y="470" fill="#EEE" rx="8" />
            <rect width="237" height="44" x="35" y="534" fill="#EEE" rx="8" />
          </>
        ) : (
          ""
        )}
      </svg>

      {userData.profileImage ? (
        <div
          style={{
            width: "96px",
            height: "96px",
            borderRadius: "50%",
            backgroundImage: `url(${userData.profileImage})`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
            position: "absolute",
            left: `calc(153.5px - 48px)`,
            top: `calc(112px - 48px)`,
          }}
        ></div>
      ) : (
        <div></div>
      )}

      {userData.firstName && userData.lastName ? (
        <div className=" absolute left-[73.5px] top-[185px] flex h-[16px] w-[160px] items-center justify-center bg-white  text-lg font-semibold text-[#333]">
          {" "}
          {userData.firstName} {userData.lastName}
        </div>
      ) : (
        <div></div>
      )}
      {userData.firstName && userData.lastName ? (
        <div className=" absolute left-[117.5px] top-[214px] flex h-[8px] w-[72px] items-center justify-center bg-white text-sm font-normal text-[#737373]">
          {" "}
          {userData.email}
        </div>
      ) : (
        <div></div>
      )}

      {userLinks ? (
        <div
          style={{ backgroundColor: userLinks.color }}
          className="absolute left-[35px] top-[278px] flex h-[44px] w-[237px] items-center justify-center rounded-lg text-lg text-white"
        >
          <img
            className="absolute left-[16px] transform text-white"
            src={userLinks.icon}
            alt="selected user links platform icon"
          />
          <div className="absolute left-[40px]  text-xs text-white">
            {userLinks.platform}
          </div>
          <div className="absolute right-[16px] text-white">
            <Link to={userLinks.link} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"
                />
              </svg>
            </Link>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default function Layout() {
  let matches = useMatches();
  let isActiveLinks: boolean = matches.some(
    (match) => match.pathname === "/links",
  );
  let isActiveProfile: boolean = matches.some(
    (match) => match.pathname === "/profile",
  );

  const { userId } = useLoaderData<typeof loader>();

  return (
    <div className="flex h-screen w-full justify-center bg-[#FAFAFA] text-[#737373]">
      {/*  layout inner */}
      <div className="flex h-auto w-full flex-col p-6">
        <div className="flex items-center justify-between rounded-xl bg-white p-4">
          <img
            src="/icons/logo-devlinks-large.svg"
            alt="main logo for devlinks"
          />
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
            <EmptyPhone />
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
