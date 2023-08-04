const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log('auth')
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'judegtqa89_');
    const userId = decodedToken.userId;
    req.auth = { userId: userId };
    console.log('ok' + req.auth)
    next();
  } catch (error) {
    console.log('pas auth');
    res.status(401).json({ error });
  }
};
