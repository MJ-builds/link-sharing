import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

// Tailwind import
import tailwindStylesheet from "~/styles/tailwind.css";
// Font import
import fontsStylesheet from "~/styles/fonts.css";

export const links: LinksFunction = () => [
  { rel: "icon", type: "image/svg+xml", href: "icons/logo-devlinks-small.svg" },
  { rel: "stylesheet", href: tailwindStylesheet },
  { rel: "stylesheet", href: fontsStylesheet },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      {/* work on this layout */}
      <body className="font-instrument font-normal">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
