import React from "react";
import {Link} from "react-router-dom";

function NavigationBar() {
  return (
    <nav>
      <li>
        <Link to="/">Global</Link>
      </li>
      <li>
        <Link to="/country">Per сountry</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </nav>
  )
}

export default NavigationBar;
