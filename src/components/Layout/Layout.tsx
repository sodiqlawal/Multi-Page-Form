import { FC, PropsWithChildren } from "react";
import Footer from "./Footer";
import "./Layout.scss";
import Navbar from "./Navbar";

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="page">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
