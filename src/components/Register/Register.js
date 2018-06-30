import React from 'react';
import URL from '../../Constants';
import Popup from "reactjs-popup";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            touched: {
                name: false,
                email: false,
                password: false
            },
            userExists: false
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onRegisterError = () => {
        this.setState({userExists: true})
        console.log('user already exits', this.state.userExists)
    }

    toggleErrorStatus = () => {
        this.setState({userExists: false})
    }

    onSubmitRegister = () => {
        fetch(`${URL}/register`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json())
                .then(user => {
                    if (user.id) {
                        this.props.loadUser(user);
                        this.props.onRouteChange('home');
                    }
                })
            .then(response => response.json())
                .catch(err => {
                    this.onRegisterError();
                })
    }

    handleKeyPress = (event) => {
        if (event.key === "Enter") {
            this.onSubmitRegister()
        }
    }

    validate = (name, email, password) => {
        let re = /\S+@\S+/;
        return {
            name: name.length > 0,
            email: re.test(email),
            password: password.length > 0
        }
    }

    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.state.touched, [field] : true } 
        })
    }

    render() {
        let errors = this.validate(this.state.name, this.state.email, this.state.password);
        let isButtonEnabled = errors.name && errors.email && errors.password;
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
                    <legend className="f1 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                        <input 
                            className={ shouldMarkError('name')
                                ? "pa2 input-reset ba bg-transparent hover-bg-black b--dark-red hover-white w-100" 
                                : "pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            }
                            onBlur={this.handleBlur('name')}
                            type="text" 
                            name="name"  
                            id="name" 
                            onChange={this.onNameChange}
                        />
                    </div>
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
                            open={this.state.userExists}
                            position="right center"
                            closeOnDocumentClick
                            onClose={this.toggleErrorStatus}
                        >
                        <span>This user already exists. Please sign in. </span>
                        </Popup>
                        <div className={!errors.email && this.state.email.length > 7 ? 'error' : 'hide'}>
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
                        onClick={this.onSubmitRegister}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Register" 
                        disabled={!isButtonEnabled}
                    />
                    </div>
                </div>
            </main>
            </article>
        );
    }
}

export default Register;
