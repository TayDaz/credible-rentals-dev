const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const {
  LOCAL,
  FACEBOOK,
  GOOGLE,
  TWITTER,
  INITIATED,
  PENDING,
  VERIFIED,
  SMS_OTP,
  EMAIL,
  GUEST,
  DEFAULT,
  RENTEE,
  RENTER,
  ADMIN,
  ROOT,
  INVALID,
  VALID,
  BLOCKED,
  BLACKLISTED,
  NULL,
  SOCIAL_MEDIA,
  VERIFICATION,
  SENT,
  USED,
  RESEND,
  NOT_INITIATED,
  UPDATE,
} = require("../../../constants");

const Schema = mongoose.Schema;

// TODO : Add the category and subcategory names as enum for validation
const AddSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  addId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const MessageSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  messages: {
    type: [Schema.Types.ObjectId],
  },
});

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    residenceAddress: {
      type: String,
    },
    mobileNumber: {
      type: Number,
    },
    agreeToTerms: {
      type: Boolean,
    },
    promotions: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
      enum: [LOCAL, FACEBOOK, GOOGLE, TWITTER],
      default: LOCAL,
    },
    avatar: {
      type: String,
      default: null,
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    //type of user INVALID, VALID, BLOCKED, BLACKLISTED,
    //will become VALID after the user has successfully signup
    accountStatus: {
      type: String,
      enum: [INVALID, PENDING, VALID, BLOCKED, BLACKLISTED],
      default: PENDING,
    },
    //still yet to be decided on what should be done here
    accountStatusReason: {
      type: String,
      enum: [VERIFICATION, LOCAL, SMS_OTP, EMAIL, NULL, SOCIAL_MEDIA],
      default: VERIFICATION,
    },
    //for sms otp verification
    smsAuthStatus: {
      type: String,
      enum: [PENDING, INITIATED, VERIFIED, BLOCKED],
      default: PENDING,
    },
    //for email verification
    emailAuthStatus: {
      type: String,
      enum: [PENDING, INITIATED, VERIFIED, BLOCKED],
      default: PENDING,
    },
    //type of account
    //GUEST is still uncertain
    //DEFAULT: is when the user is verified and is only able to rent items and hence is the rentee
    //					cannot make any page modifications
    //ADMIN: this type of user is able to rent out items and hence make page modification
    //				and even might have a dashboard
    type: {
      type: String,
      enum: [GUEST, DEFAULT, RENTEE, RENTER, ADMIN, ROOT],
      default: RENTEE,
    },
    signupStatus: {
      type: String,
      enum: [INITIATED, SMS_OTP, EMAIL, VERIFIED],
      default: INITIATED,
    },
    smsVerificationCode: {
      type: String,
    },
    smsVerificationCodeStatus: {
      type: String,
      enum: [PENDING, SENT, RESEND, USED],
      default: PENDING,
    },
    smsVerificationCodeAttemptCounter: {
      type: Number,
      default: 0,
    },
    emailVerificationCode: {
      type: String,
    },
    emailVerificationCodeStatus: {
      type: String,
      enum: [PENDING, INITIATED, SENT, RESEND, USED],
      default: PENDING,
    },
    emailVerificationCodeAttemptCounter: {
      type: Number,
      default: 0,
    },
    passwordChangeStatus: {
      type: String,
      enum: [NOT_INITIATED, INITIATED, UPDATE],
      default: NOT_INITIATED,
    },
    passwordChangeChallengeCode: {
      type: String,
    },
    passwordResetStatus: {
      type: String,
      enum: [NOT_INITIATED, INITIATED, UPDATE, VERIFIED],
      default: NOT_INITIATED,
    },
    passwordResetChallengeCode: {
      type: String,
    },
    forgotPasswordStatus: {
      type: String,
      enum: [NOT_INITIATED, INITIATED, UPDATE, VERIFIED],
      default: NOT_INITIATED,
    },
    forgotPasswordCounter: {
      type: Number,
      default: 0,
    },
    forgotPasswordChallengeCode: {
      type: String,
    },
    newMobileNumber: {
      type: Number,
    },
    mobileNumberChangeStatus: {
      type: String,
      enum: [NOT_INITIATED, INITIATED, UPDATE],
      default: NOT_INITIATED,
    },
    mobileNumberChangeChallengeCode: {
      type: String,
    },
    adds: [AddSchema],
    cart: [AddSchema],
    myOrders: {
      cart: [AddSchema],
      wishlist: [AddSchema],
    },
    wishlist: [AddSchema],
    messages: [MessageSchema],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  // const user = this;
  if (this.password) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
