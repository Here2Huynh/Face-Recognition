import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';
import Clarifai from 'clarifai';


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

//Clarifai configurations
const app = new Clarifai.App({
  apiKey: 'c6a9e5031b4b44e78266156a26ac4b49'
 });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input : '',
      imageUrl: '',
      box: [],
      route: 'signin',
      isSignedIn: false
    }
  }
  
  calculateFaceLocation = (data) => {
    const regions = data.outputs[0].data.regions;
    const clarfifaiFace = regions.map(region => region.region_info.bounding_box);
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    const calculationList = [];
    clarfifaiFace.map(face => {
        const boxConversionObj = {
          leftCol: face.left_col * width,
          topRow: face.top_row * height,
          rightCol: width - (face.right_col * width),
          bottomRow: height - (face.bottom_row * height)
        }
        calculationList.push(boxConversionObj);
      }
    )
    return calculationList;
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    (route === 'signout') || (route === 'register') || (route === 'signin')
        ? this.setState({isSignedIn: false})
        : this.setState({isSignedIn: true})

    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        <Particles className='particles'
              params={particlesOptions}
              />
          {route === 'home'
            ? <div>
                <Logo /> 
                <Rank />
                <ImageLinkForm 
                  onInputChange={this.onInputChange} 
                  onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition box={box} imageUrl={imageUrl} />
              </div>
            : (
              route ==='signin' 
                ? <Signin onRouteChange={this.onRouteChange} />
                : <Register onRouteChange={this.onRouteChange} />
              )
          }
      </div>
    );
  }
}

export default App;
