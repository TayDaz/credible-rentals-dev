const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { authJwtMiddleware } = require("../../../middlewares/auth");
const {
  uploadAddController,
  getAllAddsController,
  rentAddController,
} = require("../../../controllers/user/upload");

router.post(
  "/add",
  authJwtMiddleware,
  upload.array("image", 8),
  uploadAddController
);

router.get("/adds", authJwtMiddleware, getAllAddsController);

router.post("/add/rent", authJwtMiddleware, rentAddController);

router.get("/allAdds", authJwtMiddleware, getAllAddsController);

module.exports = router;
