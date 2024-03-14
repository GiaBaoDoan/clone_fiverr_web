import mongoose from "mongoose";
const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    gigId: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    replyByOwner: {
      type: String,
    },
    star: {
      type: Number,
      require: true,
      enum: [1, 2, 3, 4, 5],
    },
    desc: {
      type: String,
      require: true,
    },
    likes: {
      type: [String],
      require: false,
    },
    dislike: {
      type: [String],
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Review", ReviewSchema);
