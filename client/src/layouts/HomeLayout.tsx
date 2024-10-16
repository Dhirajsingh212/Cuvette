import Header from "@/components/Header";
import { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-4 ">
      <Header />
      {children}
    </div>
  );
};

export default HomeLayout;
