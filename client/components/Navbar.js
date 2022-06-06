import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav>
      <h4 className="nav-item">🏁 F1 go fast 🏁</h4>
      <Link to="/races" className="nav-item">
        Races
      </Link>
      <Link to="/about" className="nav-item">
        About
      </Link>
      <a
        href="https://github.com/Erschindel/F1_Race_Visualizer"
        className="float-right"
        target="_blank"
      >
        <FaGithub size={50} className="gh-logo" />
      </a>
    </nav>
  );
};

export default Navbar;
