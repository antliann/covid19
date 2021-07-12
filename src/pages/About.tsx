import React from 'react';
import {Container, Typography} from "@material-ui/core";

function About() {
  return (
    <Container>
      <div className="spacing-top">
        <Typography className="center-text">
          This is a simple app that provides Covid19 statistics.
          To search data choose the type of statistics on the top of the app
          (global statistics or statistics per country), then choose your filters and press search button.
        </Typography><br /><br />
        <Typography className="center-text">
          The app uses free public API <a href="https://covid19api.com/">https://covid19api.com/</a>.
        </Typography><br /><br />
        <Typography className="center-text">
          © Anton Liannoi, 2021
        </Typography>
      </div>
    </Container>
  )
}

export default About;
