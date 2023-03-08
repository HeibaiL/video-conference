import React, { FC } from "react";

//components
import Header from "../components/Header";

type LayoutProps = {
    children?: React.ReactNode;
}


const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header/>
      {children}
    </div>
  )
}

export default Layout