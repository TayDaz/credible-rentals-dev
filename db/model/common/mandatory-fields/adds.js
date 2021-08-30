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
  TABLE,
  FURNITURE,
  PROCESSING,
  RENTED,
  NOT_RENTED,
} = require("../../../../constants");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ImageSchema = Schema({
  key: {
    type: String,
    required: true,
  },
  title: String,
});

const UserSchema = Schema(
  {
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mandatoryAddFields = {
  addStatus: {
    type: String,
    default: ACTIVE,
    enum: [DRAFT, PENDING_VERIFICATION, ACTIVE, INACTIVE, BLOCKED, BLACKLISTED],
  },
  userId: {
    type: ObjectId,
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
    enum: [SOFA, TABLE],
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: [SINGLE, SOFA_SET],
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
  currentRenteeUserId: {
    type: ObjectId,
    default: null,
  },
  currentCheckedoutRenteeUserIds: {
    type: [ObjectId],
    default: [],
  },
  previousRenteeUserIds: {
    type: [ObjectId],
    default: [],
  },
  cancelledOrders: {
    type: [UserSchema],
  },
};
