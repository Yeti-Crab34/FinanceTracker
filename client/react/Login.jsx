import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Login = props => {

  // State initialization:
  const [loginSlide, slideDirection] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  // Slide animation effect, activates when loginSlide state changes
  useEffect(() => {
    if (loginSlide === 'left') {
      const box = document.querySelector('#slideBox');
      const top = document.querySelector('.topLayer');
      box.classList.remove('anim-slide-right');
      top.classList.remove('anim-login-slide-right')
      box.classList.add('anim-slide-left');
      top.classList.add('anim-login-slide-left')
      document.querySelector('#email').value = email;
    } else if (loginSlide === 'right') {
      const box = document.querySelector('#slideBox');
      const top = document.querySelector('.topLayer');
      box.classList.remove('anim-slide-left');
      top.classList.remove('anim-login-slide-left')
      box.classList.add('anim-slide-right');
      top.classList.add('anim-login-slide-right')
    }
  }, [loginSlide]);


  /* onClick function for loginbutton. Sends request to backend to verify login */ 
  const loginBtn = async () => {
    try {
      const status = await axios.post('http://localhost:3002/login', 
        {email: email, password: password },
        {
          withCredentials: true, 
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json', 
          },
        }, 
      );
      // After successful login:
      if (status) props.changeLoginState(true);
      else console.log('Error logging in');
    }
    catch(err) {
      console.log('Error logging in');
    }
  };

  /* 
    onClick function for signupbutton. Sends request to backend to create a user,
    After confirming successful signup, it should redirect to dashboard, but right now
    it just redirects to logIn page again where user can login. Not sure where the bug is for that.
  */ 
  const signUpBtn = async () => {
    try {
      if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) console.log('did not pass regex');
      const status = await axios.post('http://localhost:3002/signup',
        {fullname: fullName, email: email, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json', 
          },
        }
      );
      console.log(status);
      // After successful signup:
      if (status) props.changeLoginState(true);
      else console.log('error signing up');
    }
    catch(err) {
      console.log('error in sign up attempt');
    }
    // After successful sign up:
  };

  /* 
    the login and sign up are both part of the same page. Left is sign up, right is login.
    This renders the inputs and buttons for both login and signup. slideDirection is how the animation 
    occurs when we switch from the login side to the sign up side and etc.
  */
  return (
    <div className="loginContent">
      <div id="back"></div> 
      <div id="slideBox">
        <div className="topLayer">
          {/* left hand side: sign up*/} 
          <div className="left">
            <div className="content">
              <h2>Sign Up</h2>
              <div className="form-group">
                <input type="text" placeholder="Full Name" onChange={e => setFullName(e.target.value)}/>
                <input id="email" type="text" placeholder="E-mail" onChange={e => setEmail(e.target.value)}/>
                <input id="password" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                <input type="password" placeholder="Confirm Password" />
              </div>
              <button id="signup" onClick={signUpBtn}>Sign up</button>
              {/* Button to shift over to login page */}
              <button id="goLeft" className="off" onClick={() => slideDirection('right')}>Login</button>
              {/* <button type="button" className="login-with-google-btn" onClick="window.location.href='/auth/google'">
                Sign in with Google
              </button> */}
            </div>
          </div>
          {/* right hand side: log in*/} 
          <div className="right">
            <div className="content">
              <h2>Login</h2>
              <div className="form-group">
                <input id="email" type="text" placeholder="E-mail" onChange={e => setEmail(e.target.value)}/>
                <input id="password" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
              </div>
              <button id="login" type="submit" onClick={loginBtn}>Log in</button>
              {/* Button to shift over to sign-up page */}
              <button id="goRight" className="off" onClick={() => slideDirection('left')}>Sign Up</button>
              {/* <button type="button" className="login-with-google-btn" onClick="window.location.href='/auth/google'">
                Sign up with Google
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;