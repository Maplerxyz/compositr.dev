import type StandardResponse from "@/common/typings/api/StandardResponse";
import type { NextApiRequest, NextApiResponse } from "next";
import RateLimiter from "lambda-rate-limiter";

const limit = RateLimiter({
  interval: 60 * 1000,
});

const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse>
) {
  try {
    await limit.check(10, req.headers["x-forwarded-for"] as string);
  } catch {
    return res.status(429).json({
      data: {},
      message: "Too many requests. Try again later.",
      error: true,
    });
  }

  const { body }: { body: void | Body } = req;
  const { DISCORD_WEBHOOK } = process.env;

  if (req.method !== "POST")
    return res.status(405).json({
      error: true,
      data: {},
      message: "Method not allowed",
    });
  if (!body)
    return res.status(400).json({
      error: true,
      data: {},
      message: "Malformed body",
    });
  if (!body.email)
    return res.status(400).json({
      error: true,
      data: {},
      message: "Missing email",
    });
  if (!body.message)
    return res.status(400).json({
      error: true,
      data: {},
      message: "Missing message",
    });
  if (!regex.test(body.email))
    return res.status(400).json({
      error: true,
      data: {},
      message: "Invalid email",
    });
  try {
    const r = await fetch(DISCORD_WEBHOOK!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "Message from " + body.email,
            description: body.message,
            timestamp: new Date().toISOString(),
            color: 3092790,
            fields: [
              {
                name: "Headers",
                value: `User-Agent: \`${
                  req.headers["user-agent"]
                }\`\nSec-Ch-Ua-Plaform: ${
                  req.headers["sec-ch-ua-platform"] ?? "(none)"
                }`,
                inline: false,
              },
              {
                name: "IP",
                value: `Forwarded For ${req.headers["x-forwarded-for"]}`,
                inline: true,
              },
              {
                name: "Cloudflare Country",
                value: req.headers["CF-IPCountry"] ?? "No country",
                inline: true,
              },
            ],
          },
        ],
        username: body.email,
      }),
    }).then((r) => {
      if (!r.ok) {
        console.error(`Something went wrong`)
        console.error(`Request Code: ${r.status}`)
        throw new Error(`Something went wrong.`);
      }
      return r;
    });

    return res.status(204).end();
  } catch (e) {
    return res.status(500).json({
      error: true,
      data: {},
      message: `Internal server error ${e}`,
    });
  }
}

interface Body {
  email: string;
  message: string;
}
