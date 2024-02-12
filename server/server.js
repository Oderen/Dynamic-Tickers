"use strict";
const express = require("express");
const http = require("http");
const io = require("socket.io");
const cors = require("cors");

const PORT = process.env.PORT || 4000;
let fetchInterval = 5000;
let timer = null;

const tickers = [
  "AAPL", // Apple
  "GOOGL", // Alphabet
  "MSFT", // Microsoft
  "AMZN", // Amazon
  "FB", // Facebook
  "TSLA", // Tesla
];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  const randomSeconds = Math.floor(Math.random() * 5) + 5;
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds() + randomSeconds
  );
}

function getQuotes(socket) {
  const quotes = tickers.map((ticker) => ({
    ticker,
    exchange: "NASDAQ",
    price: randomValue(100, 300, 2),
    change: randomValue(0, 200, 2),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  }));

  socket.emit("ticker", quotes);
}

function trackTickers(socket) {
  // run the first time immediately
  getQuotes(socket);

  // every N seconds
  timer = setInterval(function () {
    getQuotes(socket);
  }, fetchInterval);

  socket.on("disconnect", function () {
    clearInterval(timer);
  });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

socketServer.on("connection", (socket) => {
  socket.on("start", () => {
    trackTickers(socket);
  });

  socket.on("changeInterval", (data) => {
    clearInterval(timer);
    fetchInterval = data.interval;
    trackTickers(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
