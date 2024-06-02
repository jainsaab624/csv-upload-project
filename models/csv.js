import mongoose from "mongoose";

const filesSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
    },
    filePath: {
      type: String,
    },
    file: {
      type: String,
    },
  },
  {
    timestamps: {
      options: {
        timeZone: "Asia/Kolkata",
        hour12: true,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      },
    },
  }
);

const filesModel = mongoose.model("file", filesSchema);
export default filesModel;
