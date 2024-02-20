import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./auth/Nav";
import QueryWrapper from "./auth/QueryWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Padgapow",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="#" />
      </head>
      <body
        className={`mx-4 md:mx-48 xl:mx-96 ${inter.className} font-sans bg-gray-200`}
      >
        <QueryWrapper>
          <Nav />
          {children}
        </QueryWrapper>
      </body>
    </html>
  );
}
