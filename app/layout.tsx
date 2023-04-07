"use client";
/* eslint-disable @next/next/no-page-custom-font */
import "./styles/globals.scss";
import "./styles/markdown.scss";
import "./styles/prism.scss";
import { SessionProvider } from "next-auth/react";
import { ACCESS_CODES, IS_IN_DOCKER } from "./api/access";

function Meta() {
  const metas = {
    version: "Azure",
    access: ACCESS_CODES.size > 0 || IS_IN_DOCKER ? "enabled" : "disabled",
  };

  return (
    <>
      {Object.entries(metas).map(([k, v]) => (
        <meta name={k} content={v} key={k} />
      ))}
    </>
  );
}

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <Meta />
        <link rel="manifest" href="/site.webmanifest"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        ></link>
        <script src="/serviceWorkerRegister.js" defer></script>
      </head>
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
