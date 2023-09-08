/* eslint-disable consistent-return */

const jwt = require("jsonwebtoken");

const handleAuthError = (res) => {
  res.status(401).send({ message: "Необходима авторизация" });
};

// const extractBearerToken = (header) => {
//   return header.replace("Bearer ", "");
// };

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;

  // if (!authorization || !authorization.startsWith("Bearer ")) {
  //   return handleAuthError(res);
  // }

  // const token = extractBearerToken(authorization);
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
