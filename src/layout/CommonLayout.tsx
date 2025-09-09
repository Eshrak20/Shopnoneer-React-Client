import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface IProps {
  children: ReactNode;
}
// const noHeaderFooter =
//   location.pathname.includes("login") || location.pathname.includes("signup");

export default function CommonLayout({ children }: IProps) {
  return (
    <>
      {/* {noHeaderFooter || <Navbar />} */}
      <Navbar />
      <div>{children}</div>
      <Footer />
      {/* {noHeaderFooter || <Footer />} */}
    </>
  );
}
