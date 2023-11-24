/** @type {import("lint-staged").Config} */
const config = {
  "*.{ts,tsx,mjs,cjs}": [
    "dotenv pnpm prettier --write",
    "dotenv pnpm dlx eslint --fix",
  ],
};

export default config;
