require("dotenv").config();

export const IS_PUBLIC_KEY = process.env.IS_PUBLIC_KEY;
export const JWT_SECRET = process.env.JWT_SECRET;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const SALT_ROUNDS: number =+ process.env.SALT_ROUNDS || 10;
