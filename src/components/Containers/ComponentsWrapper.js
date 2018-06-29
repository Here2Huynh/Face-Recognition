import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation';
import Signin from '../Signin/Signin';
import Register from '../Register/Register';
import Home from '../Home/Home';

//initial state to be used to clear state when user signs out 
const initialState = {
    input : '',
    imageUrl: '',
    box: [],
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
}


class ComponentsWrapper extends Component {
    constructor(){
        super();
        this.state = {
            route: 'signin',
            isSignedIn: false,
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
              }    
        }
    }

    //when users signs in, take res from db and set the state
    loadUser = (data) => {
        this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
        }})
    }

    //controls the states when the routes are changed
    onRouteChange = (route) => {
    (route === 'signout') || (route === 'register') || (route === 'signin')
        ? this.setState(initialState)
        : this.setState({isSignedIn: true})
    
    console.log(route)
    this.setState({route: route});
    }

    render() {
        const { isSignedIn, route, user } = this.state;
        return (
            <div>
                <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} route={route}/>
                {route === 'home'
                ? <Home user={user}/>
                : (
                    route ==='signin' || route ==='signout'
                    ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                    : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                    )
                }
            </div>
        );
    }
}

export default ComponentsWrapper;

// THINGS TO DO:
// -error message when wrong credentials are entered
// -submit form with enter is hit 
//fix empty register form submission