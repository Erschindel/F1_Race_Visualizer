import React from "react";
import { Link } from "react-router-dom";

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
      {/* <Link to="/D3_view" className="nav-item">
        D3_view
      </Link> */}
    </nav>
  );
};

export default Navbar;
