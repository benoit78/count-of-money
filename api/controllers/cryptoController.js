const CoinGeckoClient = require("coingecko-api");
const catchAsync = require('../utils/catchAsync');

const client = new CoinGeckoClient();

exports.getCryptoList = catchAsync(async (req, res, next) => {
  try {
    const response = (await client.coins.all({ per_page: 50 })).data;
    if (!response)
      return res
        .status(404)
        .send({ message: "CRYPTO SERVER FAILED TO ANSWER" });
        res.status(200).json({
          status: "success",
          crypto: response,
        });
  } catch (e) {
    res.status(500).send({ message: "INTERNAL_SERVER_ERROR" });
  }
});

exports.getCryptoById = catchAsync(async (req, res, next) => {
  try {
    const {cryptoId} = req.params;
    const response = (await client.coins.fetch(cryptoId, {})).data;
    if (!response) return res.status(404).send({ message: "NOT_FOUND" });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).send({ message: "INTERNAL_SERVER_ERROR" });
  }
})