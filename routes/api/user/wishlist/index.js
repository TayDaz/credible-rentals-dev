const router = require("express").Router();
const {
  addToWishlistController,
  removeFromWishlistController,
} = require("../../../controllers/user/wishlist");

router.post("/add", addToWishlistController);
router.post("/remove", removeFromWishlistController);

module.exports = router;
