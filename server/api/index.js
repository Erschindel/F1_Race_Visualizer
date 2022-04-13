const router = require('express').Router();

router.use('/tracks', require('./tracks'));
router.use('/races', require('./races'));
router.use('/drivers', require('./drivers'));

router.get('/about', (req, res, next) => {
  try {
    res.send('checks');
  } catch (error) {
    next(error);
  }
});

router.use((req, res, next) => {
  const err = new Error('Page not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
