const { FURNITURE, SOFA, TABLE } = require("../../constants");
const AddFurnitureSofaModel = require("../../db/model/adds/furniture/sofa");
const AddFurnitureTableModel = require("../../db/model/adds/furniture/table");

const addsSchemaMap = {
  [FURNITURE]: {
    [SOFA]: AddFurnitureSofaModel,
    [TABLE]: AddFurnitureTableModel,
  },
};

const getSchema = (category, subCategory) => {
  return addsSchemaMap[category][subCategory];
};

module.exports = {
  getSchema,
};
