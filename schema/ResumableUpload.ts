import mongoose from "mongoose";

const ResumableUploadSchema = new mongoose.Schema({
  uuid: String,
  filename: String,
  size: Number, // Size in bytes
  progress: Number, // Bytes recieved, if size === progress then the file is complete
});

export default mongoose.model("ResumableUpload", ResumableUploadSchema);