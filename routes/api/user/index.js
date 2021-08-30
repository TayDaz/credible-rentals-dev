const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const upload = multer({ dest: "avatars/" });
const uploadRoute = require("./upload");
const myOrdersRoute = require("./my-orders");
const cartRoute = require("./cart");
const wishlistRoute = require("./wishlist");
const {
  profileController,
  updateNonAuthUserInfoController,
  updatePasswordController,
  updateMobileNumberController,
  updateResidenceAddressController,
  updateAvatarController,
  uploadAddController,
} = require("../../controllers/user");
const { authJwtMiddleware } = require("../../middlewares/auth");
// const jwtMiddleware = require("../../middlewares/jwtValidator");

router.get("/profile", authJwtMiddleware, profileController);

router.post(
  "/update/nonAuthInfo",
  authJwtMiddleware,
  updateNonAuthUserInfoController
);

router.post("/update/password", authJwtMiddleware, updatePasswordController);

router.post(
  "/update/mobileNumber",
  authJwtMiddleware,
  updateMobileNumberController
);
router.post(
  "/update/residenceAddress",
  authJwtMiddleware,
  updateResidenceAddressController
);

router.post(
  "/update/avatar",
  authJwtMiddleware,
  upload.single("avatar"),
  updateAvatarController
);

router.use("/upload", uploadRoute);

/** this route is for adding and removing products from cart, wishlist */
router.use("/cart", authJwtMiddleware, cartRoute);

router.use("/wishlist", authJwtMiddleware, wishlistRoute);

router.use("/my-orders", authJwtMiddleware, myOrdersRoute);

module.exports = router;
