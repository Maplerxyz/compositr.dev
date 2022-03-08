import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/db";
import type { ImageFile as ImageFileType } from "../../../../schema/ImageFile";
import ImageFile from "../../../../schema/ImageFile";
import StandardResponse from "../../../../typings/api/v1/StandardResponse";
import { auth } from "../../../../util/auth";
import makeResourceID from "../../../../util/resourceID";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse>
) {
  const getBody = new Promise<Buffer>((resolve) => {
    if (!req.body) {
      let buffer = Buffer.from("");
      req.on("data", (chunk) => {
        buffer = Buffer.concat([buffer, chunk]);
      });

      req.on("end", () => {
        req.body = buffer;
        resolve(buffer);
      });
    }
  });

  await dbConnect();

  const {
    authorization,
    "x-image-filename": filename,
  } = req.headers;

  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed", data: null });
  if (!authorization)
    return res.status(401).json({
      message: "Missing Authorization header! Unauthorized.",
      data: null,
    });


  const user = await auth(authorization);
  if (!user)
    return res.status(401).json({
      message: "Invalid Authorization header! Unauthorized.",
      data: null,
    });

  // User is authenticated. Now check if the image exists.

  let buffer = await getBody;

  if (buffer.length > 8_000_000)
    return res.status(413).json({
      message: "Image upload exceeds 8MB",
      data: null,
    });

  // User is authenticated. Now check if the image exists.
  const resourceID = makeResourceID(buffer);

  res.status(200).json({
    message: "Image upload complete",
    data: {
      image: {
        filename: filename,
        size: buffer.length,
        length: buffer.length,
        done: true,
        resourceID,
      },
    },
  });

  const file = new ImageFile({
    filename: filename,
    owner: user.name,
    resourceID,
    uuid: null as any, // ShareX override
    size: buffer.length,
    raw: buffer,
    created: new Date(),
  } as ImageFileType);
  return await file.save();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
