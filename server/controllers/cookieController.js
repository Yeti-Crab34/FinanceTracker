const cookieController = {};


/**
* setSSIDCookie - store the user id in a cookie for frontend access
*/
cookieController.setUserSSIDCookie = (req, res, next) => {
  const id = res.locals.user_id;
  res.cookie('SSID', id);
  return next(); 
}

module.exports = cookieController;
