import React from 'react';
import {Link} from 'react-router-dom';
import {Typography, Toolbar, MenuItem} from "@material-ui/core";

function NavigationBar() {
  return (
    <Toolbar>
      <div className="flex-adapt">
        <Typography className="title" variant="h6">Covid19 Statistics</Typography>
        <div className="nav-links flex-adapt">
          <MenuItem>
            <Link className="link" to={process.env.PUBLIC_URL + '/'}>Global statistics</Link>
          </MenuItem>
          <MenuItem>
            <Link className="link" to={process.env.PUBLIC_URL + '/country'}>Statistics per country</Link>
          </MenuItem>
          <MenuItem>
            <Link className="link" to={process.env.PUBLIC_URL + '/about'}>About</Link>
          </MenuItem>
        </div>
      </div>
    </Toolbar>
  )
}

export default NavigationBar;
