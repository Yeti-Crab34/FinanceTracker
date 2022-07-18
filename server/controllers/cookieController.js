const cookieController = {};


/**
* setSSIDCookie - store the user id in a cookie for frontend access
*/
cookieController.setUserSSIDCookie = (req, res, next) => {
  console.log('setting cookie', res.locals.user_id);
  const id = res.locals.user_id;
  res.cookie('SSID', id);
  console.log(res.cookie);
  return next(); 
}

module.exports = cookieController;


/*
From Roy's code, mostly for the maxAge part of the cookie creation

app.get("/auth/google/redirect", passport.authenticate('google'), (req, res) => {
    //console.log(userEmail);
    res.cookie('email', encodeURIComponent(userEmail), {maxAge: 24 * 60 * 60 * 1000});
    res.cookie('firstname', encodeURIComponent(userName), {maxAge: 24 * 60 * 60 * 1000});
    res.redirect(path.resolve(__dirname, '/homepage.html'));
});

*/