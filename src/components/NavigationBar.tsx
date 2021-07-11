import React from 'react';
import {Link} from 'react-router-dom';
import {Typography, Toolbar, Menu, MenuItem, IconButton, Button} from "@material-ui/core";

function NavigationBar() {
  return (
    <Toolbar>
      <Typography variant="h6">Covid19 Statistics</Typography>
        <MenuItem>
          <Link to="/">Global statistics</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/country">Statistics per country</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/about">About</Link>
        </MenuItem>
    </Toolbar>
  )
}

export default NavigationBar;
