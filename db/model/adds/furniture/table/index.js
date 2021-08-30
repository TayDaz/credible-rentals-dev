const mongoose = require("mongoose");

const {
  BLOCKED,
  BLACKLISTED,
  PENDING_VERIFICATION,
  ACTIVE,
  INACTIVE,
  DRAFT,
  SINGLE,
  SOFA_SET,
  LEATHER,
  COTTON,
  LINEN,
  SILK,
  VELVET,
  AVERAGE,
  EXCELLENT,
  GOOD,
  DAYS,
  WEEKS,
  MONTHS,
  YEARS,
  DOLLAR,
  EURO,
  DAY,
  WEEK,
  MONTH,
  YEAR,
  SOFA,
  FURNITURE,
  TABLE,
  RESTAURANT,
  STUDY,
  DINING,
  WOOD,
  IRON,
  ALUMINIUM,
  SQUARE,
  ROUND,
  RECTANGLE,
  PROCESSING,
  RENTED,
  NOT_RENTED,
} = require("../../../../../constants");

const Schema = mongoose.Schema;

const ImageSchema = Schema({
  key: {
    type: String,
    required: true,
  },
  title: String,
});

const AddFurnitureTableSchema = new Schema(
  {
    addStatus: {
      type: String,
      default: ACTIVE,
      enum: [
        DRAFT,
        PENDING_VERIFICATION,
        ACTIVE,
        INACTIVE,
        BLOCKED,
        BLACKLISTED,
      ],
    },
    userId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [FURNITURE],
    },
    subCategory: {
      type: String,
      required: true,
      enum: [TABLE],
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [RESTAURANT, STUDY, DINING],
    },
    fabric: {
      type: String,
      enum: [LEATHER, COTTON, LINEN, SILK, VELVET],
    },
    materialType: {
      type: String,
      enum: [WOOD, IRON, ALUMINIUM],
    },
    size: {
      type: String,
    },
    shape: {
      type: String,
      enum: [SQUARE, ROUND, RECTANGLE],
    },
    quantity: {
      type: Number,
    },
    condition: {
      type: String,
      required: true,
      enum: [AVERAGE, EXCELLENT, GOOD],
    },
    purchaseDate: {
      type: Date,
    },
    minRentingPeriodNumber: {
      type: Number,
      required: true,
    },
    minRentingPeriodDuration: {
      type: String,
      required: true,
      enum: [DAYS, WEEKS, MONTHS, YEARS],
    },
    maxRentingPeriodNumber: {
      type: Number,
    },
    maxRentingPeriodDuration: {
      type: String,
      enum: [DAYS, WEEKS, MONTHS, YEARS],
    },
    originalPriceAmount: {
      type: Number,
    },
    originalPriceDenomination: {
      type: String,
      required: true,
      enum: [DOLLAR, EURO],
    },
    rentPriceAmount: {
      type: Number,
      required: true,
    },
    rentPriceDenomination: {
      type: String,
      required: true,
      enum: [DOLLAR, EURO],
    },
    rentPriceDuration: {
      type: String,
      enum: [DAY, WEEK, MONTH, YEAR],
    },
    availableFrom: {
      type: Date,
      required: true,
    },
    images: {
      type: [ImageSchema],
      required: true,
    },
    rentStatus: {
      type: String,
      enum: [PROCESSING, RENTED, NOT_RENTED],
      default: NOT_RENTED,
    },
    renteeUserId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const AddFurnitureTableModel = mongoose.model(
  "addFurnitureTable",
  AddFurnitureTableSchema
);

module.exports = AddFurnitureTableModel;
