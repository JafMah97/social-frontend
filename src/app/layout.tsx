import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knoekta - Konekta social",
  description:
  "Make new Connections "
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
