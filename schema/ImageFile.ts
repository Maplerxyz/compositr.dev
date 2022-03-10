import mongoose, { Schema } from "mongoose";

const ImageFileSchema = new Schema({
  uuid: String,
  filename: String,
  size: Number, // Size in bytes
  resourceID: String, // Resource ID
  owner: String, // Owner username
  raw: Buffer,
  created: Date
});

export default mongoose.models?.ImageFile ||
  mongoose.model("ImageFile", ImageFileSchema);

export interface ImageFile {
  uuid: string;
  filename: string;
  size: number;
  resourceID: string;
  owner: string;
  raw: Buffer;
  created: Date
}
