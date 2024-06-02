import mongoose from "mongoose";

const filesSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
    },
    filepath: {
      type: String,
    },
    file: {
      type: String,
    },
  },
  {
    timestamps: {
      options: { timeZone: "Asia/Kolkata" },
    },
  }
);

const filesModel = mongoose.model("file", filesSchema);
export default filesModel;
