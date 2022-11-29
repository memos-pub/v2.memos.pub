const typography = (theme) => ({
  DEFAULT: {},
});

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      typography,
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
