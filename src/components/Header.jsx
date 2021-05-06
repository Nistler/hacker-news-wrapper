import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>HACKER NEWS</h1>
      <nav className="nav-center">
        <Link to="/" className="nav-link">
          STORIES
        </Link>
        <a
          className="nav-link"
          href="https://github.com/Nistler/hacker-news-wrapper"
        >
          SOURCE CODE
        </a>
      </nav>
    </header>
  );
};

export default Header;
