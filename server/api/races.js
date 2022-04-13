const router = require('express').Router();
router.get('/', function (req, res, next) {
  try {
    res.send('races');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
