import { FC } from "react";
import NavBar from "../NavBar";
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
