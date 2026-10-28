import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bloom v3 foundation",
  description:
    "In-development foundation for the Bloom v3 web app. Not the live Bloom app.",
  // The isolated v3 foundation must not be indexed by search engines.
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
