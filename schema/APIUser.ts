import mongoose from "mongoose";

const APIUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  key: String,
});

export interface APIUser {
  name: string;
  email: string;
  key: string;
}

export default mongoose.model("APIUser", APIUserSchema);
