import React from "react";
import "../styles/header.css";

const Header = () => {
    return <div>
        <h2 className="subtitle">powered by <a href="https://5xcampus.com/" className="subtitle-link">5xCampus</a></h2>
        <h1 className="title">臺灣銀行代碼查詢</h1>
    </div>;
};

export default Header;