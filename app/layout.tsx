import "@/app/globals.css";

import Header from "@/components/layouts/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reddit - The heart of the internet",
  description:
    "Reddit is where millions of people gather for conversations about the things they care about, in over 100,000 subreddit communities."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="pt-14 p-4">{children}</main>
      </body>
    </html>
  );
}
