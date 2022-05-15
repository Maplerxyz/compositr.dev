module.exports = {
  content: [
    "./src/common/components/**/*.{tsx,jsx,js,ts}",
    "./src/pages/**/*.{tsx,jsx,js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
};
