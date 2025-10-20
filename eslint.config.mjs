import antfu from "@antfu/eslint-config";

export default antfu({
  type: "app",
  react: true,
  typescript: true,
  formatters: true,
  stylistic: {
    ident: 2,
    semi: true,
    quotes: "double",
  },
}, {
  ignores: [
    ".github/workflows/**/*.{yml,yaml}",
  ],
  rules: {
    "react/no-array-index-key": "off",
    "ts/no-redeclare": "off",
    "ts/consistent-type-definitions": ["error", "type"],
    "no-console": ["warn", { allow: ["log", "warn", "error"] }],
    "antfu/consistent-chaining.no-top-level-await": ["off"],
    "node/prefer-global/process": ["off"],
    "node/no-process-env": ["error"],
  },
});
