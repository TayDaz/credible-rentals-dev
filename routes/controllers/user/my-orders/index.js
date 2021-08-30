const UserModel = require("../../../../db/model/user");
const { getSchema } = require("../../../../utils/product-schemas");
const {
  SUCCESS,
  FAILURE,
  NOT_RENTED,
  RENTED,
  PROCESSING,
  INACTIVE,
} = require("../../../../constants");

/**To get all the products from cart and wishlist */
const getMyOrdersController = async (req, res) => {
  const user = req.user;
  const myOrders = user.myOrders;

  /** get the products from the user profile */

  const orders = {};
  for (const [type, value] of Object.entries(myOrders)) {
    orders[type] = [];
    let addDetails, AddSchema;
    for (const add of value) {
      AddSchema = getSchema(add.category, add.subCategory);

      addDetails = await AddSchema.findById({ _id: add.addId }).catch((err) => {
        console.error(
          "ERROR: [controllers/user/my-orders/.js] getMyOrdersController() while trying to get the orders"
        );
      });

      orders[type].push(addDetails);
    }
  }

  return res.json({ status: SUCCESS, data: orders });
};

const addToCartController = async (req, res) => {
  const user = req.user;
  const { product } = req.body;
  const { category, subCategory } = product;

  // console.log("AddToCart");
  // return res.status(200).json({ status: SUCCESS, data: [] });

  /**if product is not present then send a failure response */
  if (!product) {
    console.error(
      "[controllers/user/cart/.js] addToCartController() ERROR no product found in req.body"
    );
    return res
      .status(200)
      .json({ status: FAILURE, message: "Product not found" });
  }

  /** if product found then check if the product exists in category, subcategory with the _id */

  const AddSchema = getSchema(category, subCategory);

  const productExists = await AddSchema.findById({ _id: product._id }).catch(
    (err) => {
      console.error(
        `[controllers/user/cart/.js] ERROR in DB while checking if the product with _id(${product._id}) exists in category(${category}) and subCategory(${subCategory})`,
        err
      );
      return res.status(200).json({ status: FAILURE, message: "Server error" });
    }
  );

  /** id product does not exist */
  if (!productExists) {
    console.error(
      `[controllers/user/cart/.js] product with _id(${product._id}) does not exists in category(${category}) and subCategory(${subCategory})`
    );
    return res
      .status(200)
      .json({ status: FAILURE, message: "Product does not exist" });
  }

  /** if product exists, then add it to the user's profile */

  const addProductToUserProfileCart = await UserModel.findOneAndUpdate(
    { _id: user._id },
    { $push: { cart: { category, subCategory, addId: product._id } } },
    { new: true }
  )
    .select("-_id cart")
    .catch((err) => {
      console.error(
        `[controllers/user/cart/.js] ERROR while adding the product in the user's profile product._id(${product._id})`,
        err
      );
      return res.json({ status: FAILURE, message: "Server error" });
    });

  console.log("added to cart", addProductToUserProfileCart);

  /** if product not added to user's cart */
  if (!addProductToUserProfileCart) {
    console.error(
      `[controllers/user/cart/.js] WARNING product(${product._id}) did not get added to cart`
    );
    return res
      .status(200)
      .json({ status: FAILURE, message: "Product does not exist" });
  }

  return res.json({ status: SUCCESS, data: addProductToUserProfileCart });
};

const deleteFromCartController = async (req, res) => {
  const { product } = req.body;
  const { user } = req;

  const AddSchema = getSchema(product.category, product.subCategory);

  const removedCartProduct = await UserModel.findByIdAndUpdate(
    { _id: user._id },
    {
      $pull: {
        cart: {
          addId: product._id,
        },
      },
    },
    {
      new: true,
    }
  )
    .select("-_id cart")
    .catch((err) => {
      console.error(
        "[controllers/user/cart/.js] deleteFromCart ERROR while deleting the product from the cart",
        err
      );

      return res.json({ status: FAILURE, message: "Server Error" });
    });

  if (!removedCartProduct) {
    console.error(
      "[controllers/user/cart/.js] deleteFromCart WARNING no product found when deleteting"
    );

    return res.json({ status: FAILURE, message: "Server Error" });
  }

  console.log("Deleted from cart", removedCartProduct);

  return res.json({ status: SUCCESS, data: removedCartProduct });
};

const getAllCartItemsController = async (req, res) => {
  const user = req.user;
  const cart = user.cart;

  let AddSchema, _id;
  const cartItems = [];
  for (product of cart) {
    AddSchema = getSchema(product.category, product.subCategory);

    // console.log("cart product id - ", product, AddSchema);

    const productDetails = await AddSchema.findById({
      _id: product.addId,
    }).catch((err) => {
      console.log(
        "[controllers/user/cart/.js] getAllCartItemsController ERROR while searching for cart product",
        err
      );
      return res.status(200).json({ status: FAILURE, mesage: "Server error" });
    });

    if (!productDetails) {
      console.log(
        "[controllers/user/cart/.js] getAllCartItemsController ERROR No product found"
      );
      // return res.status(200).json({ status: FAILURE, mesage: "Server error" });
    }

    cartItems.push(productDetails);
  }

  return res.status(200).json({ status: SUCCESS, data: cartItems });
};

const checkoutFromCartController = async (req, res) => {
  const { user } = req;
  const { product } = req.body;

  const AddSchema = getSchema(product.category, product.subCategory);

  const addUserToRenteeList = await AddSchema.findByIdAndUpdate(
    { _id: product._id },
    {
      rentStatus: PROCESSING,
      $push: {
        currentCheckedoutRenteeUserIds: user._id,
      },
    },
    {
      new: true,
    }
  ).catch((err) => {
    console.error(
      "ERROR: [controllers/user/my-orders/.js] checkoutFromCartController() error while updating the rentStatus to PROCESSING",
      err
    );
    return res.json({ status: FAILURE, message: "Server error" });
  });

  if (!addUserToRenteeList) {
    console.error(
      "WARNING: [controllers/user/my-orders/.js] checkoutFromCartController() no result return after updating the rentStatus to PROCESSING",
      err
    );
    return res.json({ status: FAILURE, message: "Server error" });
  }

  return res.json({ status: SUCCESS, data: addUserToRenteeList });
};

const cancelCheckedoutProductFromCartController = async (req, res) => {
  const { user } = req;
  const { product } = req.body;
  const { _id, category, subCategory } = product;

  const AddSchema = getSchema(category, subCategory);

  /**pull the userid from currentCheckedoutRenteeUserIds */

  const removeFromCheckedoutRentees = await AddSchema.findByIdAndUpdate(
    { _id },
    {
      $pull: {
        currentCheckedoutRenteeUserIds: user._id,
      },
    },
    { new: true }
  );

  return res.json({ status: SUCCESS, data: removeFromCheckedoutRentees });
};

const getAllWishlistItemsController = async (req, res) => {
  const user = req.user;
  const wishlist = user.wishlist;

  let AddSchema, _id;
  const wishlistItems = [];
  for (product of wishlist) {
    AddSchema = getSchema(product.category, product.subCategory);

    // console.log("cart product id - ", product, AddSchema);

    const productDetails = await AddSchema.findById({
      _id: product.addId,
    }).catch((err) => {
      console.log(
        "[controllers/user/cart/.js] getAllwishlistItemsController ERROR while searching for cart product",
        err
      );
      return res.status(200).json({ status: FAILURE, mesage: "Server error" });
    });

    if (!productDetails) {
      console.log(
        "[controllers/user/cart/.js] getAllwishlistItemsController ERROR No product found"
      );
      // return res.status(200).json({ status: FAILURE, mesage: "Server error" });
    }

    wishlistItems.push(productDetails);
  }

  return res.status(200).json({ status: SUCCESS, data: wishlistItems });
};

const addToWishlistController = async (req, res) => {
  const user = req.user;
  const { product } = req.body;
  const { category, subCategory } = product;

  // console.log("AddToCart");
  // return res.status(200).json({ status: SUCCESS, data: [] });

  /**if product is not present then send a failure response */
  if (!product) {
    console.error(
      "[controllers/user/cart/.js] addToCartController() ERROR no product found in req.body"
    );
    return res
      .status(200)
      .json({ status: FAILURE, message: "Product not found" });
  }

  /** if product found then check if the product exists in category, subcategory with the _id */

  const AddSchema = getSchema(category, subCategory);

  const productExists = await AddSchema.findById({ _id: product._id }).catch(
    (err) => {
      console.error(
        `[controllers/user/cart/.js] ERROR in DB while checking if the product with _id(${product._id}) exists in category(${category}) and subCategory(${subCategory})`,
        err
      );
      return res.status(200).json({ status: FAILURE, message: "Server error" });
    }
  );

  /** id product does not exist */
  if (!productExists) {
    console.error(
      `[controllers/user/cart/.js] product with _id(${product._id}) does not exists in category(${category}) and subCategory(${subCategory})`
    );
    return res
      .status(200)
      .json({ status: FAILURE, message: "Product does not exist" });
  }

  /** if product exists, then add it to the user's profile */

  const addProductToUserWishlist = await UserModel.findOneAndUpdate(
    { _id: user._id },
    { $push: { wishlist: { category, subCategory, addId: product._id } } },
    { new: true }
  )
    .select("-_id wishlist")
    .catch((err) => {
      console.error(
        `[controllers/user/cart/.js] ERROR while adding the product in the user's profile product._id(${product._id})`,
        err
      );
      return res.json({ status: FAILURE, message: "Server error" });
    });

  console.log("added to wishlist", addProductToUserWishlist);

  /** if product not added to user's cart */
  if (!addProductToUserWishlist) {
    console.error(
      `[controllers/user/cart/.js] WARNING product(${product._id}) did not get added to wishlist`
    );
    return res
      .status(200)
      .json({ status: FAILURE, message: "Product does not exist" });
  }

  return res.json({ status: SUCCESS, data: addProductToUserWishlist });
};

const deleteFromWishlistController = async (req, res) => {
  const { product } = req.body;
  const { user } = req;
  // const AddSchema = getSchema(product.category, product.subCategory);

  const removedWishlistProduct = await UserModel.findByIdAndUpdate(
    { _id: user._id },
    {
      $pull: {
        wishlist: {
          addId: product._id,
        },
      },
    },
    {
      new: true,
    }
  )
    .select("-_id wishlist")
    .catch((err) => {
      console.error(
        "[controllers/user/cart/.js] deleteFromWishlist ERROR while deleting the product from the wishlist",
        err
      );

      return res.json({ status: FAILURE, message: "Server Error" });
    });

  if (!removedWishlistProduct) {
    console.error(
      "[controllers/user/cart/.js] deleteFromWishlist WARNING no product found when deleteting"
    );

    return res.json({ status: FAILURE, message: "Server Error" });
  }

  console.log("Deleted from cart", removedWishlistProduct);

  return res.json({ status: SUCCESS, data: removedWishlistProduct });
};

const cancelCurrentOrderController = async (req, res) => {
  const { user } = req;
  const { product } = req.body;
  const { _id, category, subCategory } = product;

  const AddSchema = getSchema(category, subCategory);

  const updatedAdd = await AddSchema.findByIdAndUpdate(
    { _id },
    {
      rentStatus: NOT_RENTED,
      currentRenteeUserId: null,
      $push: {
        cancelledOrders: {
          userId: user._id,
        },
      },
    },
    {
      new: true,
    }
  ).catch((err) => {
    console.error("cancelCurrenOrderController() Error while updating the DB");
    return res.json({
      status: FAILURE,
      message: "Server Error",
    });
  });

  return res.json({
    status: SUCCESS,
    data: updatedAdd,
  });
};

module.exports = {
  getMyOrdersController,
  addToCartController,
  deleteFromCartController,
  getAllCartItemsController,
  checkoutFromCartController,
  cancelCheckedoutProductFromCartController,
  getAllWishlistItemsController,
  addToWishlistController,
  deleteFromWishlistController,
  cancelCurrentOrderController,
};
