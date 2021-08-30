const UserModel = require("../../../../db/model/user");
const { getSchema } = require("../../../../utils/product-schemas");
const { SUCCESS, FAILURE } = require("../../../../constants");

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
    .select("cart")
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

  return res.json({ status: SUCCESS, data: productExists });
};

const deleteFromCartController = async (req, res) => {
  const { product } = req.body.product;
  const user = req.user;
  const AddSchema = getSchema(product.category, product.subCategory);

  const removedCartProduct = await AddSchema.findByIdAndUpdate(
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
    .select("cart")
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

module.exports = {
  getAllCartItemsController,
  addToCartController,
  deleteFromCartController,
};
