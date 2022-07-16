const cookieController = {};


/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setUserSSIDCookie = (req, res, next) => {
  //added destructuring based on approach lecture
  const { id } = res.locals.userId;
  res.cookie('SSID', id, { httpOnly: true });
  return next(); 
}

module.exports = cookieController;
