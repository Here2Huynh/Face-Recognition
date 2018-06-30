import React from 'react';
import URL from '../../Constants';
import './Signin.css';
import Popup from "reactjs-popup";

class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            touched: {
                email: false,
                password: false
            },
            wrongCredentials: false
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onLoginError = () => {
        this.setState({wrongCredentials: true})
        console.log('wrong credentials', this.state.wrongCredentials)
    }

    toggleErrorStatus = () => {
        this.setState({wrongCredentials: false})
    }

    onSubmitSignIn = () => {
        fetch(`${URL}/signin`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                    this.printVar()
                }
            })
            .then(response => response.json())
            .catch(err => {
                this.onLoginError();
            })
    }

    handleKeyPress = (event) => {
        if (event.key === "Enter") {
            this.onSubmitSignIn()
        }
    }

    validate = (email, password) => {
    let re = /\S+@\S+/;        
    return {
            email: re.test(email),
            password: password.length > 0
        }
    }

    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.state.touched, [field] : true }
        })
    }


    
    printVar = () => {
        console.log('URL', URL);
        console.log('process.env', process.env)
        console.log('process.env.NODE_ENV', process.env.NODE_ENV)
        console.log('wrong credentials', this.state.wrongCredentials)
      }
    

    render() {
        const { onRouteChange } = this.props;
        let errors = this.validate(this.state.signInEmail, this.state.signInPassword);
        let isButtonEnabled = errors.email && errors.password;
        const shouldMarkError = (field) => {
            const hasError = !errors[field];
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
        }
        
        return(
            <article className="br3 ba b--black-10 mv4 w-100 w-25-ns w-50-m w-100-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            className={ shouldMarkError('email') 
                                ? "pa2 input-reset ba bg-transparent hover-bg-black b--dark-red hover-white w-100"
                                : "pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            } 
                            onBlur={this.handleBlur('email')}
                            type="email" 
                            name="email-address"  
                            id="email-address"
                            onChange={this.onEmailChange}
                        />
                        <Popup
                            open={this.state.wrongCredentials}
                            position="right center"
                            closeOnDocumentClick
                            onClose={this.toggleErrorStatus}
                        >
                        <span> Credentials you have enter is incorrect. </span>
                        </Popup>
                        <div className={(!errors.email && this.state.signInEmail.length > 7) ? 'error' : 'hide' }>
                            Please enter a valid email address.
                        </div>

                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            className={ shouldMarkError('password')
                                ? "b pa2 input-reset ba bg-transparent hover-bg-black b--dark-red hover-white w-100"
                                : "b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            }
                            onBlur={this.handleBlur('password')}
                            type="password" 
                            name="password"  
                            id="password" 
                            onChange={this.onPasswordChange}
                            onKeyPress={this.handleKeyPress}
                        />
                    </div>
                    
                    </fieldset>
                    <div className="">
                    <input 
                        onClick={this.onSubmitSignIn}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Sign in"
                        disabled={!isButtonEnabled}
                    />
                    </div>
                    <div className="lh-copy mt3">
                    <p 
                        onClick={() => onRouteChange('register')}
                        href="#0" 
                        className="f6 link dim black db pointer">No account? Register here!
                    </p>
                    </div>
                </div>
            </main>
            </article>
        );
    }
}

export default Signin;
