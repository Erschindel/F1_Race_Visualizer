import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as RouteHolder,
} from "react-router-dom";
import Navbar from "./Navbar";
import About from "./About";
import Races from "./Races";

const Routes = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <br />
        <div className="grey">
          <RouteHolder>
            <Route exact path="/" element={<Races />} />
            <Route path="/about" element={<About />} />
            <Route path="/races" element={<Races />} />
          </RouteHolder>
        </div>
      </div>
    </Router>
  );
};

export default Routes;
