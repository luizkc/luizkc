/** @type {import("lint-staged").Config} */
const config = {
  "*.{ts,tsx,mjs,cjs}": ["bunx prettier --write", "bunx eslint --fix"],
};

export default config;
