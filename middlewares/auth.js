/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");
const Unauthorized = require("../errors/Unauthorized");

const handleAuthError = () => {
  // res.status(401).send({ message: "Необходима авторизация" });
  throw new Unauthorized(`Необходима авторизация`);
};

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  // console.log(token);
  let payload;

  try {
    payload = jwt.verify(token, "super-strong-secret");
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
