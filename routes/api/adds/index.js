const router = require("express").Router();

const {
  getHomePageAddsController,
  getCategoryAddsController,
  getOwnerInformationController,
  sendMessageToOwner,
  getProductRenteeUserInformationsController,
} = require("../../controllers/adds");

const { authJwtMiddleware } = require("../../middlewares/auth");

router.get("/home/latest-adds", getHomePageAddsController);

router.get("/category/:category", getCategoryAddsController);

router.get("/getOwnerInformation/:addId", getOwnerInformationController);

router.post("/sendMessageToOwner", authJwtMiddleware, sendMessageToOwner);

router.post(
  "/getProductRenteeUserInformation",
  authJwtMiddleware,
  getProductRenteeUserInformationsController
);

module.exports = router;
