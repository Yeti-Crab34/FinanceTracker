import React, { useEffect, useRef } from 'react';

const Login = props => {


  const slide = direction => {
    if (direction === 'right') {
      console.log(direction);
      document.querySelector('#slideBox').animate({
        'marginLeft' : '0'
      });
      // $('.topLayer').animate({
      //   'marginLeft' : '100%'
      // });
    } else {
      
      // $('#slideBox').animate({
      //   'marginLeft' : '50%'
      // });
      // $('.topLayer').animate({
      //   'marginLeft': '0'
      // });
    }
  }

  useEffect(() => {

  }, [])

  return (
    <div className="loginContent">
      <div id="back">
        <div className="backRight"></div>
        <div className="backLeft"></div>
      </div>

      <div id="slideBox">
        <div className="topLayer">
          <div className="left">
            <div className="content">
              <h2>Sign Up</h2>
              {/* <form method="post" onSubmit="return false;"> */}
                <div className="form-group">
                  <input type="text" placeholder="Username" />
                  <input type="text" placeholder="Password" />
                </div>
                <div className="form-group"></div>
                <div className="form-group"></div>
                <div className="form-group"></div>
              {/* </form> */}
              <button id="goLeft" className="off" onClick={slide("left")}>Login</button>
              <button id="signup" onClick="window.location.href='/auth/google'">Sign up</button>
              <button type="button" className="login-with-google-btn" onClick="window.location.href='/auth/google'">
                Sign in with Google
              </button>
            </div>
          </div>
          <div className="right">
            <div className="content">
              <h2>Login</h2>
              {/* <form method="post" onSubmit="return false;"> */}
                <div className="form-group">
                  <input type="text" placeholder="Username" />
                  <input type="text" placeholder="Password" />
                </div>
                <button id="login" type="submit" onClick="window.location.href='/auth/google'">Log in</button>
                <button id="goRight" className="off" onClick={() => slide("right")}>Sign Up</button>
                <button type="button" className="login-with-google-btn" onClick="window.location.href='/auth/google'">
                  Sign up with Google
                </button>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;

// $(document).ready(function(){
//   $('#goRight').on('click', function(){
//     $('#slideBox').animate({
//       'marginLeft' : '0'
//     });
//     $('.topLayer').animate({
//       'marginLeft' : '100%'
//     });
//   });
//   $('#goLeft').on('click', function(){
//     $('#slideBox').animate({
//       'marginLeft' : '50%'
//     });
//     $('.topLayer').animate({
//       'marginLeft': '0'
//     });
//   });
// });