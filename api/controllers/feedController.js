let Parser = require('rss-parser');
const catchAsync = require('../utils/catchAsync');
let parser = new Parser();

exports.getFeed = catchAsync(async (req, res, next) => {
  const feed = await parser.parseURL('https://cointext.com/fr/actualites/feed/');

  res.status(200).json({
    status: "success",
    feed: feed,
  });
});