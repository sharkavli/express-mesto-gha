const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/index");

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use((req, res, next) => {
  req.user = {
    id: "64e8bbde25e765dc8037c6f5",
  };

  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Сервер запущен на: http://localhost:${PORT}`);
});
