const notFoundPage = (req, res) => {
  return res.status(404).send({ message: "Страница не найдена." });
};

module.exports = { notFoundPage };
