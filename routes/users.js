const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getUsers,
  getUser,
  // createUser,
  updateProfile,
  updateAvatar,
  getMeUser,
} = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/", getUsers);
router.get("/me", auth, getMeUser);
router.get("/:userId", getUser);
// router.post("/", createUser);
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile
);
router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required(),
    }),
  }),
  updateAvatar
);

module.exports = router;
