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

  const loginBtn = async () => {
    console.log('login');
    try {
      const status = axios.post('/login',
        {email: email, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json', 
          },
        }
      );
      // After successful login:
      if(status) // what should status be?
        props.changeLoginState(true);
    }
    catch(err) {
      setErr(err.message);
    }
  };

  const signUpBtn = () => {
    console.log('signup');
    try {
      const status = axios.post('/signup',
        {fullname: fullName, email: email, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json', 
          },
        }
      );
      // After successful signup:
      if(status) // what should status be?
        props.changeLoginState(true);
      // else 
    }
    catch(err) {
      setErr(err.message);
    }
    // After successful sign up:
    props.changeLoginState(true);
  };

  return (
    <div className="loginContent">
      {/* <div id="back">
        <div className="backRight"></div>
        <div className="backLeft"></div>
      </div> */}

      <div id="slideBox">
        <div className="topLayer">
          <div className="left">
            <div className="content">
              <h2>Sign Up</h2>
              <div className="form-group">
                <input type="text" placeholder="Full Name" onChange={e => setFullName(e.target.value)}/>
                <input id="email" type="text" placeholder="E-mail" onChange={e => setEmail(e.target.value)}/>
                <input id="password" type="text" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                <input type="text" placeholder="Confirm Password" />
              </div>
              <button id="signup" onClick={signUpBtn}>Sign up</button>
              {/* Button to shift over to login page */}
              <button id="goLeft" className="off" onClick={() => slideDirection('right')}>Login</button>
              {/* <button type="button" className="login-with-google-btn" onClick="window.location.href='/auth/google'">
                Sign in with Google
              </button> */}
            </div>
          </div>
          <div className="right">
            <div className="content">
              <h2>Login</h2>
              <div className="form-group">
                <input id="email" type="text" placeholder="E-mail" onChange={e => setEmail(e.target.value)}/>
                <input id="password" type="text" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
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