import React from "react";
import { Header } from "./header/header";
import { Outlet } from "react-router";

export const MainLayout = () => {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
