import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import ComponentsWrapper from './ComponentsWrapper';

//predfined configs for Particles api
const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
  interactivity: {
    detect_on: 'window',
    events: {
      onclick: {
        enable: true,
        mode: 'repulse'
      }
    }
  }
} 


class App extends Component {
  // constructor() {
  //   super();
  // }


  //updates the state with new box coordinates from API via CSS
  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  render() {
    
    return (
      <div className="App">
        <ErrorBoundary>
          <Particles className='particles' params={particlesOptions} />
          <ComponentsWrapper />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
