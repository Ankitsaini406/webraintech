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
    FACEBOOK_ID: process.env.NEXT_APP_FACEBOOK_ID,
  }
};

export default nextConfig;
