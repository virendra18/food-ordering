import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurant",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="max-w-7xl mx-auto px-3 lg:px-7">{children}</main>;
}
