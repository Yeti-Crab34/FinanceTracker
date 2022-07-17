const cookieController = {};


/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setUserSSIDCookie = (req, res, next) => {
  //added destructuring based on approach lecture
  const id = res.locals.user_id;
  res.cookie('SSID', id);
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