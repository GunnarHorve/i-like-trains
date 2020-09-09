

import React from 'react';

import './logo-bar.css';
import github from './github.svg';
import react from './react.svg';
import travis from './travis.svg';
import mbta from './mbta.svg';


class LogoBar extends React.Component {
  render() {
    return (<div id="logo-bar">
      <a href="https://github.com/GunnarHorve/i-like-trains">
        <img src={github} alt="github source" />
      </a>
      <a href="https://travis-ci.com/github/GunnarHorve/i-like-trains">
        <img src={travis} alt="build server" />
      </a>
      <a href="https://reactjs.org/docs/create-a-new-react-app.html">
        <img src={react} alt="create react app" />
      </a>
      <a href="https://www.mbta.com/developers/v3-api">
        <img src={mbta} alt="mbta v3 api" />
      </a>
    </div>);
  }
}

export default LogoBar;
