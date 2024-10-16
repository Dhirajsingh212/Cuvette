import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export function genToken(id: string, username: string): string {
  return jwt.sign({ id, username }, process.env.SECRET!, {
    expiresIn: process.env.END,
  });
}

export function verifyToken(token: string): JwtPayload | string {
  const decoded = jwt.verify(token, process.env.SECRET!);
  return decoded;
}

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}

export async function verifyHashedPassword(
  password: string,
  dbpassword: string
): Promise<boolean> {
  const correct = await bcrypt.compare(password, dbpassword);
  if (correct) {
    return true;
  }
  return false;
}
