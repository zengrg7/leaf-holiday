import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/custom-style.scss";
import GlobalState from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Leaf Holiday",
  description:
    "Trek the Himalayas with us! Authentic routes, expert guides, and unforgettable adventures await.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>{children}</GlobalState>
      </body>
    </html>
  );
}
