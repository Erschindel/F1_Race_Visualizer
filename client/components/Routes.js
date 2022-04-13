import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes as RouteHolder,
} from 'react-router-dom';
import Navbar from './Navbar';
import About from './About';
import Races from './Races';

const Routes = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <br />
        <RouteHolder>
          <Route exact path="/" element={<Races />} />
          <Route path="/about" element={<About />} />
          <Route path="/races" element={<Races />} />
        </RouteHolder>
        {/* <Route exact path="/campuses" component={AllCampuses} />
                <Route exact path="/students" component={AllStudents} />
                <Route path="/campuses/:id" component={SingleCampus} />
                <Route path="/students/:id" component={SingleStudent} /> */}
      </div>
    </Router>
  );
};

export default Routes;
