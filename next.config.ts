import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config();

const nextConfig: NextConfig = {
  images: {
    domains: [
      'www.w3.org',
      'd3mkw6s8thqya7.cloudfront.net',
      'drive.google.com',
    ],
  },
  env: {
    API_URL: process.env.LOCAL_HOST_URL,
    HOST_URL: process.env.HOST_URL,
    AUTH_SECRET: process.env.NEXT_AUTH_SECRET,
    JWT_SECRET: process.env.NEXT_JWT_SECRET_KEY,
    FACEBOOK_ID: process.env.NEXT_APP_FACEBOOK_ID,
    GA_ANALYTICS_ID: process.env.NEXT_APP_GA_ANALYTICS_ID,
  }
};

export default nextConfig;
