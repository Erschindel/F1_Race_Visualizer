import React from 'react';
import { Link } from 'react-router-dom';

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
    </nav>
  );
};

export default Navbar;
