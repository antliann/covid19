import React from 'react';
import {Link} from 'react-router-dom';
import {Typography, Toolbar, MenuItem} from "@material-ui/core";

function NavigationBar() {
  return (
    <Toolbar>
      <div className="flex-adapt">
        <Typography className="title" variant="h6">Covid19 Statistics</Typography>
        <div className="nav-links flex-row">
          <MenuItem>
            <Link className="link" to="/">Global statistics</Link>
          </MenuItem>
          <MenuItem>
            <Link className="link" to="/country">Statistics per country</Link>
          </MenuItem>
          <MenuItem>
            <Link className="link" to="/about">About</Link>
          </MenuItem>
        </div>
      </div>
    </Toolbar>
  )
}

export default NavigationBar;
