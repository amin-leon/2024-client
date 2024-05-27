import React from "react";
import { Outlet } from "react-router-dom";

const MainContent = () => {
  return (
    <div className="bg-red-500 h-screen w-full overflow-hidden">
      <Outlet />
    </div>
  );
};

export default MainContent;
