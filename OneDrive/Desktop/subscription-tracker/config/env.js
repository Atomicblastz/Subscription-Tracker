import { config } from "dotenv";

const env = process.env.NODE_ENV || "development";
config({ path: `.env.${env}.local` });

export const {
  PORT,
  SERVER_URL,
  NODE_ENV,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  ARCJET_ENV,
  ARCJET_KEY,
  QSTASH_URL,
  QSTASH_TOKEN,
  EMAIL_PASSWORD,
} = process.env;
