const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.types.ObjectId;

const NewMessageSchema = new Schema({
  fromUserId: {
    type: ObjectId,
    required: true,
  },
  toUserId: {
    type: ObjectId,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const MessagesSchema = new Schema(
  {
    fromUserId: {
      type: ObjectId,
      required: true,
    },
    toUserId: {
      type: ObjectId,
      required: true,
    },
    messages: [NewMessageSchema],
    productId: {
      type: ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const MessagesModel = mongoose.model("message", MessagesSchema);

module.exports = MessagesModel;
