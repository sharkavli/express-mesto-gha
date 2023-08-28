// const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");

const { PORT = 3000 } = process.env;
// console.log(process.env);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use((req, res, next) => {
  req.user = {
    id: "64e8bbde25e765dc8037c6f5",
  };

  next();
});

app.use(userRouter);
app.use(cardRouter);
// app.use("/users", require("./routes/users"));
// app.use("/cards", require("./routes/cards"));

app.listen(PORT, () => {
  console.log(`Сервер запущен на: http://localhost:${PORT}`);
});
