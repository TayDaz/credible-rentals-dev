const { v4: uuidv4 } = require("uuid");
const UserModel = require("../../../../db/model/user");
const AddFurnitureSofaModel = require("../../../../db/model/adds/furniture/sofa");
const AddFurnitureTableModel = require("../../../../db/model/adds/furniture/table");
const { uploadFile, uploadBlob } = require("../../../../utils/S3");
const { getSchema } = require("../../../../utils/product-schemas");
const {
  SUCCESS,
  FURNITURE,
  SOFA,
  TABLE,
  RENTED,
  INACTIVE,
} = require("../../../../constants");

const addMap = {
  [FURNITURE]: {
    [SOFA]: AddFurnitureSofaModel,
    [TABLE]: AddFurnitureTableModel,
  },
};

const uploadAddController = async (req, res) => {
  console.log(
    "[controllers/user/upload/.js] uploadAddController() req.body",
    req.body
  );
  console.log(
    "[controllers/user/upload/.js] uploadAddController() req.file",
    req.file
  );
  console.log(
    "[controllers/user/upload/.js] uploadAddController() req.files",
    req.files
  );

  const { category, subCategory, imageTitles } = req.body;
  const images = req.files;
  const titles = imageTitles.split(",");
  // console.log("Images ", images[0]);

  const AddSchema = addMap[category][subCategory];

  //upload image files to s3

  const dbImages = [];
  let s3Result, key;

  for (const indx in images) {
    //upload an image with await and then check if the key there and here are the same
    key = uuidv4();
    s3Result = await uploadFile(images[indx]);

    console.log("s3 result ", s3Result);

    // if (!s3Result) {
    // 	//send FAILURE res
    // }

    // if (!s3Result === key) {
    // 	//send FAILURE res
    // }

    dbImages.push({
      key: images[indx].filename,
      title: titles[indx],
    });
    //if error then return status FAILURE

    //else continue
  }

  console.log("dbImages", dbImages);
  const _id = req.user._id;

  //update the add in the AddSchema
  const createAdd = await AddSchema.create({
    ...req.body,
    userId: _id,
    images: dbImages,
  }).catch((err) => {
    console.log(
      "[controllers/user/upload/.js] uploadAddController() ERROR while creating new add in database",
      err
    );
    return res.status(200).json({
      status: FAILURE,
      message:
        "An unexpected error occurred while uploading the add. Please try again",
    });
  });

  if (!createAdd) {
    console.log(
      "[controllers/user/upload/.js] uploadAddController() No data returned while creating new add in database"
    );
    return res.status(200).json({
      status: FAILURE,
      message:
        "An unexpected error occurred while uploading the add. Please try again",
    });
  }

  // //link the add to the particular user's profile

  const linkAddToUser = await UserModel.findOneAndUpdate(
    { _id },
    { $push: { adds: { category, subCategory, addId: createAdd._id } } }
  ).catch((err) => {
    console.log(
      "[controllers/user/upload/.js] uploadAddController() ERROR while linking the add to the user collection"
    );
    return res.status(200).json({ status: FAILURE, message: "Server error" });
  });

  if (!linkAddToUser) {
    console.log(
      "[controllers/user/upload/.js] uploadAddController() ERROR no document was upadated while linking the add"
    );
    return res.status(200).json({ status: FAILURE, message: "Server error" });
  }

  return res.status(200).json({
    status: SUCCESS,
    message: "Add uploaded successfully",
    data: createAdd,
  });
};

const getAllAddsController = async (req, res) => {
  //get the adds from req.user

  const { adds } = req.user;

  const addsMap = {
    [FURNITURE]: {
      [SOFA]: [],
      [TABLE]: [],
    },
  };

  for (const add of adds) {
    // console.log("adds.ids", add.addId);
    addsMap[add.category][add.subCategory].push(add.addId);
  }

  const allAdds = [];
  let resAdd, AddSchema;
  for (const [category, val] of Object.entries(addsMap)) {
    for (const [subCategory, ids] of Object.entries(val)) {
      // console.log("ids", ids);
      AddSchema = addMap[category][subCategory];
      resAdd = await AddSchema.find({ _id: { $in: ids } }).catch((err) => {
        console.log(
          "[controllers/user/upload/.js] getAllAddsController() ERROR while searchinng for the add ids",
          err
        );
        return res
          .status(200)
          .json({ status: FAILURE, message: "Server error" });
      });

      // console.log("resAdd", resAdd);

      allAdds.push(...resAdd);
    }
  }

  return res.status(200).json({ status: SUCCESS, data: allAdds });

  //query to get all the adds from the database
};

const rentAddController = async (req, res) => {
  const { user } = req;
  const { product, currentRenteeUserId } = req.body;

  // console.log("renetAddController", req.body);

  const AddSchema = getSchema(product.category, product.subCategory);

  const changeRentStatus = await AddSchema.findByIdAndUpdate(
    { _id: product._id },
    {
      rentStatus: RENTED,
      // addStatus: INACTIVE,
      currentRenteeUserId,
      currentCheckedoutRenteeUserIds: [],
    },
    {
      new: true,
    }
  );

  if (!changeRentStatus) {
    return res.json({ status: FAILURE, message: "Server error" });
  }

  return res.json({ status: SUCCESS, data: changeRentStatus });
};

module.exports = {
  uploadAddController,
  getAllAddsController,
  rentAddController,
};
