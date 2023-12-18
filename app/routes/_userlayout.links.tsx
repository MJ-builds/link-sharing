import type { MetaFunction } from "@remix-run/node";
import { Outlet, useMatches } from "@remix-run/react";
import { Button } from "~/components/ui/button";

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
    <div className="">Links</div>
  );
}
