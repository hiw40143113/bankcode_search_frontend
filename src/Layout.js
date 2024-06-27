import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import SearchInput from "./components/SearchInput";

const Layout = () => {
    return (
        <div>
            <Header />
            <SearchInput />
            <Outlet />
        </div>
    );
};

export default Layout;