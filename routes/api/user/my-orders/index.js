const router = require("express").Router();
const {
  getMyOrdersController,
  getAllCartItemsController,
  addToCartController,
  deleteFromCartController,
  checkoutFromCartController,
  getAllWishlistItemsController,
  addToWishlistController,
  deleteFromWishlistController,
  cancelCheckedoutProductFromCartController,
  cancelCurrentOrderController,
} = require("../../../controllers/user/my-orders");

router.get("/", getMyOrdersController);

router.get("/cart", getAllCartItemsController);
router.post("/cart", addToCartController);
router.delete("/cart", deleteFromCartController);

router.post("/cart/checkout", checkoutFromCartController);
router.delete("/cart/checkout", cancelCheckedoutProductFromCartController);

router.delete("/currentOrders", cancelCurrentOrderController);

router.get("/wishlist", getAllWishlistItemsController);
router.post("/wishlist", addToWishlistController);
router.delete("/wishlist", deleteFromWishlistController);

module.exports = router;
