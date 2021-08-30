const router = require("express").Router();
const {
  getAllCartItemsController,
  addToCartController,
  deleteFromCartController,
} = require("../../../controllers/user/cart");

router.get("/", getAllCartItemsController);
router.post("/", addToCartController);
router.delete("/", deleteFromCartController);

module.exports = router;
