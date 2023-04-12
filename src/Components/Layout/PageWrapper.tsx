
import { FC } from "react";
import NavBar from "../Navbar";

interface Props {
  children: React.ReactNode;
}

const PageWrapper: FC<Props> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default PageWrapper;
