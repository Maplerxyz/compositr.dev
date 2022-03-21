import mongoose, { Schema } from "mongoose";

const ImageFileSchema = new Schema({
  uuid: String,
  filename: String,
  size: Number, // Size in bytes
  resourceID: { type: String, index: true }, // Resource ID
  owner: String, // Owner username
  raw: Buffer,
  created: Date,
});

const model =
  mongoose.models?.ImageFile ?? mongoose.model("ImageFile", ImageFileSchema);

export default model;

export interface ImageFile {
  uuid: string;
  filename: string;
  size: number;
  resourceID: string;
  owner: string;
  raw: Buffer;
  created: Date;
}
