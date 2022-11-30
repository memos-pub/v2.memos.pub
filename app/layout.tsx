import { ReactNode } from "react";
import "./globals.css";

interface Props {
  children: ReactNode;
}

const Layout = (props: Props): JSX.Element => {
  const { children } = props;

  return (
    <html lang="en">
      <head />
      <body>
        <div className="prose">{children}</div>
      </body>
    </html>
  );
};

export default Layout;
