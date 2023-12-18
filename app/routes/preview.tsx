import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Devlinks | Preview" },
    {
      name: "description",
      content: "Preview your created links!",
    },
  ];
};

export default function Preview() {
  return (
    // background container
    <div className="">Preview</div>
  );
}
