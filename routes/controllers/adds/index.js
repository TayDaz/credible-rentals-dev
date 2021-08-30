const AddFurnitureSofaModel = require("../../../db/model/adds/furniture/sofa");
const AddFurnitureTableModel = require("../../../db/model/adds/furniture/table");
const UserModel = require("../../../db/model/user");
const { getSchema } = require("../../../utils/product-schemas");
const {
  FURNITURE,
  SOFA,
  TABLE,
  FAILURE,
  SUCCESS,
  ACTIVE,
} = require("../../../constants");

const addsSchemaMap = {
  [FURNITURE]: {
    [SOFA]: AddFurnitureSofaModel,
    [TABLE]: AddFurnitureTableModel,
  },
};

const getHomePageAddsController = async (req, res) => {
  let latestAdd;

  /** get the adds based on category and sub category
   * later will be modified to use a separate collection to store the adds
   * in the homeadds collection for faster delivery
   */
  const adds = [];
  for (const [category, subCategoryObj] of Object.entries(addsSchemaMap)) {
    for (const [subCategory, AddSchema] of Object.entries(subCategoryObj)) {
      latestAdd = await AddSchema.find({ addStatus: ACTIVE })
        .sort({ updatedAt: -1 })
        .limit(5)
        .catch((err) => {
          console.error(
            `[controllers/adds/.js] getHomePageAddsController ERROR while getting the latest adds for category=${category} subCategory=${subCategory}`
          );
          return res
            .status(200)
            .json({ status: FAILURE, message: "Server error" });
        });

      if (latestAdd) {
        adds.push(latestAdd);
      }
    }
  }

  const sortedAdds = adds
    .flat()
    .sort(
      (a, b) =>
        new Date(a.updatedAt).getMilliseconds() -
        new Date(b.updatedAt).getMilliseconds()
    );

  // return res.status(200).json({
  //   status: SUCCESS,
  //   data: adds.flat(),
  // });
  return res.status(200).json({
    status: SUCCESS,
    data: sortedAdds,
  });
};

const getCategoryAddsController = async (req, res) => {
  const category = req.params.category;

  console.log(
    "[controllers/adds/.js] getCategoryAddsController category",
    category
  );

  if (!addsSchemaMap?.[category]) {
    console.error(
      `[controllers/adds/.js] getCategoryAddsController ERROR Invalid category(${category}) data requested`
    );
    return res
      .status(200)
      .json({ status: FAILURE, message: "Invalid category" });
  }

  const adds = [];

  for (const AddsSchema of Object.values(addsSchemaMap[category])) {
    console.log("AddsSchema", AddsSchema);

    const subCategoryAdds = await AddsSchema.find({ addStatus: ACTIVE })
      .sort({ createdAt: -1 })
      .limit(50)
      .catch((err) => {
        console.error(
          `[controllers/adds/.js] getHomePageAddsController ERROR while getting the latest adds for category=${category} subCategory=${subCategory}`,
          err
        );
        return res
          .status(200)
          .json({ status: FAILURE, message: "Server error" });
      });

    if (subCategoryAdds) {
      adds.push(subCategoryAdds);
    }
  }

  res.status(200).json({ status: SUCCESS, data: adds.flat() });
};

const getOwnerInformationController = async (req, res) => {
  const addId = req.params.addId;

  /** first get the add id and then get the owner info from the add id */
};

const sendMessageToOwner = async (req, res) => {
  const { product, message } = req.body;
  const { user } = req;

  console.log(`SENDING MESSAGE 
  TO USER_ID:${product.userId}
  FROM USER_ID: ${user._id}
  MESSAGE_BODY: ${message}`);

  return res.json({ status: SUCCESS });
};

const getProductRenteeUserInformationsController = async (req, res) => {
  const { user } = req;
  const {
    product: { _id, category, subCategory, currentCheckedoutRenteeUserIds },
  } = req.body;

  /**get the latest rentee ids from the add */

  const AddSchema = getSchema(category, subCategory);

  const renteeUserIds = await AddSchema.findById({ _id }).catch((err) => {
    console.error("getProductRenteeUserInformationsController err", err);
    return res.json({ status: FAILURE, message: "Server error" });
  });

  if (!renteeUserIds) {
    console.error(
      "getProductRenteeUserInformationsController renteeUserIds has no data",
      renteeUserIds
    );
    return res.json({ status: FAILURE, message: "Server error" });
  }

  const renteeUserCheckedoutIds = renteeUserIds.currentCheckedoutRenteeUserIds;

  if (!renteeUserCheckedoutIds.length > 0) {
    console.error(
      "getProductRenteeUserInformationsController renteeUserIds has no data",
      renteeUserIds
    );
    return res.json({ status: FAILURE, message: "Server error" });
  }

  const currentCheckedoutRenteeUserInformations = await UserModel.find({
    _id: { $in: renteeUserCheckedoutIds },
  })
    .select("_id firstName lastName email mobileNumber")
    .catch((err) => {
      console.log(
        "[controllers/adds/.js] getProductRenteeUserInformationsController() ERROR while searchinng for the checkedout rentee ids",
        err
      );
      return res.status(200).json({ status: FAILURE, message: "Server error" });
    });

  console.log("UserInfos : ", currentCheckedoutRenteeUserInformations);
  res.json({ status: SUCCESS, data: currentCheckedoutRenteeUserInformations });
};

module.exports = {
  getHomePageAddsController,
  getCategoryAddsController,
  getOwnerInformationController,
  sendMessageToOwner,
  getProductRenteeUserInformationsController,
};
