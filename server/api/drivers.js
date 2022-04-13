const router = require('express').Router();
router.get('/', function (req, res, next) {
  try {
    res.send('drivers');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
