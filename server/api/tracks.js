const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");
const Track = require("../db/models/Track");

router.get("/wiki/:slug", async function (req, res, next) {
  try {
    const { data } = await axios.get(
      `https://en.wikipedia.org/wiki/${req.params.slug}`
    );
    const $ = cheerio.load(data);
    const wikiData = {};
    const relevantRows = ["Circuit length", "Race length", "Laps"];

    $(".infobox tbody") // parsing HTML with cheerio
      .children()
      .each((_, el) => {
        $(el)
          .children()
          .each((_, innerEl) => {
            const currentTr = $(innerEl).text();
            if (relevantRows.includes(currentTr)) {
              const nextItem = $(innerEl).next().text();
              wikiData[currentTr] = nextItem;
            }
          });
      });

    res.status(200).send(wikiData);
  } catch (error) {
    next(error);
  }
});

router.get("/:slug", async function (req, res, next) {
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
router.get("/", function (req, res, next) {
  try {
    res.send("tracks");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
