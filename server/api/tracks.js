const router = require('express').Router();
const Track = require('../db/models/Track');

router.get('/:slug', async function (req, res, next) {
  try {
    const track = await Track.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    res.status(200).send(track);
    // res.send('tracks');
  } catch (error) {
    next(error);
  }
});
router.get('/', function (req, res, next) {
  try {
    res.send('tracks');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
