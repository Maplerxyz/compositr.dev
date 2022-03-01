import APIUser from "../schema/APIUser";
import type { APIUser as APIUserInterface } from "../schema/APIUser";

export async function auth(auth: string): Promise<null | APIUserInterface> {
  const key = auth
    .trim()
    .replace(/^Bearer\s/, "")
    .trim();
  const user = await APIUser.findOne({ key }).exec();
  if (!user) return null;
  return user;
}
