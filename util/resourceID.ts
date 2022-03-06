import crypto from "crypto";
import { ResourceID } from "../typings/api/v1/ResourceID";

export default function resourceID(buffer: Buffer): ResourceID {
  const hash = crypto.createHash("sha256").update(buffer).digest("hex");
  return `${Date.now()}-${process.pid}-${hash.slice(0, 8)}`;
}
