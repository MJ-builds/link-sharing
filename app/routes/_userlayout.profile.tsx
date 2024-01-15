import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

import { requireAuthCookie } from "~/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Devlinks | Links" },
    {
      name: "description",
      content: "Layout Index",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  let userId = await requireAuthCookie(request);
  return null;
}

export default function Links() {
  return (
    // background container
    <div className="">Profile</div>
  );
}
