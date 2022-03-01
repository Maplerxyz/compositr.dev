import { ResourceID } from "../ResourceID";

export default interface ImageMetadata {
  resourceID: ResourceID
  metadata: {
    created: number;
    filename: string;
    height?: number;
    mimetype: string;
    size: number;
    width?: number;
  };
}
