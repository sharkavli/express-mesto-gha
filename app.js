const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const router = require("./routes/index");
const { errors } = require("celebrate");

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(cookieParser());

app.use(router);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на: http://localhost:${PORT}`);
});
