import React from "react";
import {Link} from "react-router-dom";

function NavigationBar() {
  return (
    <div>
      <h1>Covid19 Statistics</h1>
      <nav>
        <li>
          <Link to="/">Global statistics</Link>
        </li>
        <li>
          <Link to="/country">Statistics per country</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </nav>
    </div>
  )
}

export default NavigationBar;
