import busboy from "busboy";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/db";
import ImageFile from "../../../../schema/ImageFile";
import StandardResponse from "../../../../typings/api/v1/StandardResponse";
import { auth } from "../../../../util/auth";
import makeResourceID from "../../../../util/resourceID";

interface ShxResponse {
  url?: string;
  message: string;
  data: null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ShxResponse>
) {
  await dbConnect();

  const {
    "x-image-filename": filename,
    "content-type": contentType,
  } = req.headers;

  const {
    api_key
  } = req.query

  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed", data: null });
  if (!api_key || Array.isArray(api_key))
    return res.status(401).json({
      message: "Missing/Malformed Authorization header! Unauthorized.",
      data: null,
    });
  if (contentType !== "multipart/form-data")
    return res
      .status(415)
      .json({ message: "Invalid content-type", data: null });

  const user = await auth(api_key);
  if (!user)
    return res.status(401).json({
      message: "Invalid Authorization header! Unauthorized.",
      data: null,
    });

  // User is authenticated. Start processing multipart/form-data.

  const bb = busboy({
    headers: req.headers,
    limits: {
      fileSize: 8 * 1024 * 1024, // 8MB
    },
  });
  bb.on("file", (name, file, info) => {
    const { encoding, filename, mimeType } = info;
    let buffer: Buffer;

    file
      .on("data", (data) => {
        if (Buffer.from(data).length > 8_000_000)
          return res.status(413).json({
            message: "File too large. Max is 8MB",
            data: null,
          });
        if (!buffer) buffer = Buffer.from(data);
        else buffer = Buffer.concat([buffer, Buffer.from(data)]);
      })
      .on("end", async () => {
        // File is ready.
        if (buffer.length > 8_000_000)
          return res
            .status(413)
            .json({ message: "File too large. Max size is 8MB", data: null });
        if (!filename)
          return res
            .status(400)
            .json({ message: "Missing filename", data: null });
        const resourceID = makeResourceID(buffer);
        const file = new ImageFile({
          filename,
          owner: user.name,
          resourceID,
          uuid: null,
          size: buffer.length,
          raw: buffer,
          created: new Date(),
        });
        await file.save();
        res.status(200).json({
          url: `https://compositr.dev/i/${resourceID}`,
          data: null,
          message: "Successfully uploaded image",
        });
      });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
