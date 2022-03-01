import mongoose from "mongoose";

const ResumableUploadSchema = new mongoose.Schema({
  uuid: String,
  filename: String,
  size: Number, // Size in bytes
  progress: Number, // Bytes recieved, if size === progress then the file is complete
  raw: Buffer, // The raw file data
});

export default mongoose.models.ResumableUpload || mongoose.model("ResumableUpload", ResumableUploadSchema);