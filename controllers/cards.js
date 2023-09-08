const Card = require("../models/card");
const NotFound = require("../errors/NotFound");
const Unauthorized = require("../errors/Unauthorized");
const InvalidReq = require("../errors/InvalidReq");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      return res.status(200).send({ data: cards });
    })
    .catch((err) => {
      return res.status(500).send({ message: `Server Error. ${err.message}` });
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      return res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        // return res.status(400).send({ message: `Invalid Data` });
        throw new NotFound(`Неверные данные`);
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (card === null) {
        // return res.status(404).send({ message: `Card Id not found.` });
        throw new NotFound(`Не найдена карточка с таким ID`);
      }
      if (card.owner.toString() !== req.user._id) {
        // res.status(401).send({ message: `You can only delete your own card` });
        throw new Unauthorized(`Вы можете удалять только свои карточки`);
      } else {
        Card.findByIdAndDelete(req.params.cardId).then(() => {
          return res.status(201).send({ message: `deleted card ${card}` });
        });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        // return res.status(400).send({ message: `Invalid card ID` });
        throw new InvalidReq(`Неверные данные`);
      }
      next(err);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.id } },
    { new: true }
  )
    .then((card) => {
      if (card === null) {
        // return res.status(404).send({ message: `Card Id not found.` });
        throw new NotFound(
          `Нет карточки с таким ID(как ты это вообще смог лайкнуть?)`
        );
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        // return res.status(400).send({ message: `Invalid card ID` });
        throw new InvalidReq(
          `Неверный ID карточки(хватит магии вне Хогвартса)`
        );
      }
      next(err);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.id } },
    { new: true }
  )
    .then((card) => {
      if (card === null) {
        // return res.status(404).send({ message: `Card Id not found.` });
        throw new NotFound(
          `Карточка с ID ${req.params.cardId} не была найдена`
        );
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        // return res.status(400).send({ message: `Invalid card ID` });
        throw new InvalidReq(`Невалидные данные ID`);
      }
      next(err);
    })
    .catch(next);
};
