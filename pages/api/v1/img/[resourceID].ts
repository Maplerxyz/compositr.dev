import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/db";
import ImageFile from "../../../../schema/ImageFile";
import StandardResponse from "../../../../typings/api/v1/StandardResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse | Buffer>
) {
  await dbConnect();
  const { resourceID } = req.query;
  if (req.method !== "GET")
    return res.status(405).json({
      message: "Method not allowed",
      data: null,
    });
  if (!resourceID || typeof resourceID !== "string")
    return res.status(400).json({
      message:
        "Invalid resourseID in URL! URL should be /api/v1/img/RESOURCE_ID",
      data: null,
    });

  const image = await ImageFile.findOne({
    resourceID: resourceID.replace(/\.[0-9a-z]+$/i, ""),
  }).exec();
  if (!image)
    return res.status(404).json({
      message: "Image not found",
      data: null,
    });
  res.setHeader(
    "Content-Type",
    `image/${image.filename
      .match(/\.[0-9a-z]+$/i)[0]
      .toLowerCase()
      .replace(".", "")}; charset=utf-8`
  );
  return res.status(200).send(image.raw);
}
