/** @type { import("lint-staged").Config } */
const config = {
  "*.{tsx,ts}": ["bun format", "bash -c 'bun typecheck'", "bun lint", "bun lint:legacy"],
  "*.js": ["bun format", "bun lint", "bun lint:legacy"],
  "*.json": ["bun format"],
};

export default config;
