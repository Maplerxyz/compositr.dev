import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../../lib/db";
import type { ImageFile as ImageFileType } from "../../../../../schema/ImageFile";
import ImageFile from "../../../../../schema/ImageFile";
import ResumableUpload, {
  ResumableUpload as ResumableUploadType,
} from "../../../../../schema/ResumableUpload";
import StandardResponse from "../../../../../typings/api/v1/StandardResponse";
import { auth } from "../../../../../util/auth";
import makeResourceID from "../../../../../util/resourceID";

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
    "x-image-mimetype": mimetype,
    "content-type": content,
  } = req.headers;
  const { uuid } = req.query;

  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed", data: null });

  if (!content)
    return res.status(400).json({
      message: "Missing Content-Type header. Must be multipart/mixed",
      data: null,
    });
  if (content !== "multipart/mixed")
    return res.status(400).json({
      message: "Invalid Content-Type header. Must be multipart/mixed",
      data: null,
    });
  if (!authorization)
    return res.status(401).json({
      message: "Missing Authorization header! Unauthorized.",
      data: null,
    });

  if (Array.isArray(uuid))
    return res.status(400).json({
      message: "Invalid uuid for image",
      data: null,
    });

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

  const user = await auth(authorization);
  if (!user)
    return res.status(401).json({
      message: "Invalid Authorization header! Unauthorized.",
      data: null,
    });

  // User is authenticated. Now check if the image exists.

  let buffer: Buffer;
  const image: ResumableUploadType | null = await ResumableUpload.findOne({
    uuid,
  }).exec();

  if (!image)
    return res.status(404).json({
      message: "Image not found",
      data: null,
    });

  if (!image.raw) buffer = Buffer.from(req.body);
  else buffer = Buffer.concat([Buffer.from(req.body), image.raw]);

  if (image.progress >= image.size)
    return res.status(400).json({
      message: "Image upload already complete",
      data: null,
    });
  if (Buffer.from(req.body).length > 8_000_000)
    return res.status(413).json({
      message: "Image upload exceeds 8MB",
      data: null,
    });
  if (buffer.length > 8_000_000)
    return res.status(413).json({
      message: "Image total size exceeds 8MB",
      data: null,
    });

  const updated = await ResumableUpload.updateOne(
    {
      uuid,
    },
    {
      raw: buffer,
      progress: buffer.length,
    } as Partial<ResumableUploadType>
  );
  if (updated.matchedCount === 0 || updated.modifiedCount === 0)
    return res.status(500).json({
      message:
        "DB image found, but could not be written to... please report this issue :(",
      data: {
        image: {
          uuid,
          filename: image.filename,
          size: image.size,
          progress: image.progress,
        },
      },
    });
  if (image.progress + Buffer.from(req.body).length >= image.size) {
    // Image upload is complete, write to database.
    if (buffer.length >= 8_000_000)
      return res.status(413).json({
        message: "Image total size exceeds 8MB",
        data: null,
      });
    const resourceID = makeResourceID(buffer);

    res.status(200).json({
      message: "Image upload complete",
      data: {
        image: {
          uuid,
          filename: image.filename,
          size: image.size,
          length: buffer.length,
          done: true,
          resourceID,
        },
      },
    });

    const file = new ImageFile({
      filename: image.filename,
      owner: user.name,
      resourceID,
      uuid: image.uuid,
      size: buffer.length,
      raw: buffer,
      created: new Date(),
    } as ImageFileType);
    await file.save();
    return await ResumableUpload.deleteOne({ uuid }).exec();
  }
  res.status(200).json({
    message: "OK",
    data: {
      length: buffer.length,
      added: buffer.length - (image?.raw?.length || 0),
      done: image.progress >= image.size,
    },
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
