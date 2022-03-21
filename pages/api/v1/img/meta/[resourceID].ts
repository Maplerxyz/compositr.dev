import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../../lib/db";
import ImageFile, {
  ImageFile as ImageFileType,
} from "../../../../../schema/ImageFile";
import StandardResponse from "../../../../../typings/api/v1/StandardResponse";
import sizeOf from "image-size";
import ExifReader from "exifreader";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse<ImageMetaData | null>>
) {
  await dbConnect();
  const { resourceID } = req.query;
  if (req.method !== "GET")
    return res.status(405).json({
      message: "Method not allowed",
      data: null,
    });
  if (!resourceID)
    return res.status(400).json({
      message:
        "Invalid resourseID in URL! URL should be /api/v1/img/RESOURCE_ID",
      data: null,
    });
  const image: ImageFileType = await ImageFile.findOne({
    resourceID: resourceID,
  }).exec();
  if (!image)
    return res.status(404).json({
      message: "Image not found",
      data: null,
    });

  // Image has been found, now we need to get the dimensions of the image
  // Also extract EXIF data from image

  const { width, height } = sizeOf(image.raw);
  const exif = ExifReader.load(image.raw, {
    expanded: true,
  });
  return res.status(200).json({
    message: `Image ${image.filename}`,
    data: {
      filename: image.filename,
      owner: image.owner,
      resourceID: image.resourceID,
      width: width || 0,
      height: width || 0,
      exif,
      size: image.size,
    },
  });
}

export interface ImageMetaData {
  filename: string;
  owner: string;
  resourceID: string;
  width: number;
  height: number;
  exif: Record<string, any>;
  size: number;
}
