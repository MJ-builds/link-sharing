import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

import { EmptyPhone } from "./_userlayout";
import { requireAuthCookie } from "~/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Devlinks | Preview" },
    {
      name: "description",
      content: "Preview your created links!",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  let userId = await requireAuthCookie(request);
  return null;
}

export default function Preview({
  color,
  selectedPlatformName,
  icon,
}: {
  color: string;
  selectedPlatformName: string;
  icon: string;
}) {
  return (
    <EmptyPhone
      color={color}
      selectedPlatformName={selectedPlatformName}
      icon={icon}
    />
  );
}
