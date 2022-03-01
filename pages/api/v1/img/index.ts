import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/db";
import ResumableUpload from "../../../../schema/ResumableUpload";
import StandardResponse from "../../../../typings/api/v1/StandardResponse";
import { auth } from "../../../../util/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse>
) {
  await dbConnect();

  const { authorization, "x-image-size": size } = req.headers;
  const mimetype = req.headers["x-image-mimetype"];
  const { filename } = req.body;

  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed", data: null });
  if (!mimetype)
    return res.status(400).json({
      message:
        "Missing X-Image-Mimetype header. Must be in format of image/FILE-TYPE e.g. image/png",
      data: null,
    });
  if (Array.isArray(mimetype))
    return res.status(400).json({
      message:
        "X-Image-Mimetype header must be in format of image/FILE-TYPE e.g. image/png",
      data: null,
    });
  if (
    !["jpg", "jpeg", "png", "webp", "gif"]
      .map((t) => `image/${t}`)
      .includes(mimetype)
  )
    return res.status(400).json({
      message: "Invalid X-Image-Mimetype header",
      data: null,
    });
  if (!size)
    return res.status(400).json({
      message: "Missing X-Image-Size header. Must be size of image in bytes",
      data: null,
    });
  if (Array.isArray(size))
    return res.status(400).json({
      message: "X-Image-Size header must be size of image in bytes",
      data: null,
    });
  if (isNaN(parseInt(size, 10)))
    return res
      .status(400)
      .json({ message: "Invalid X-Image-Size header", data: null });
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

  // User is authenticated. Create a ResumableUpload for them and return the UUID in the Location header, and JSON in the body.
  const uuid = randomUUID();
  const resumable = new ResumableUpload({
    uuid,
    size: +size,
    progress: 0,
    filename: filename || `${uuid.slice(0, 8)}.${mimetype.split("/")[1]}`,
  });
  resumable.save();

  return res.status(201).json({
    message: "Created new ResumableUpload",
    data: {
      uuid,
      size: +size,
      progress: 0,
      filename: filename || `${uuid.slice(0, 8)}.${mimetype.split("/")[1]}`,
    },
  });
}
