import { defineConfig } from "windicss/helpers";

function range(size, startAt = 1, increment = 1) {
  return Array.from(Array(size).keys()).map(
    (i) => increment * (i + 1) + startAt
  );
}

export default defineConfig({
  extract: {
    include: ["**/*.{jsx,tsx,css}"],
    exclude: ["node_modules", ".git", ".next"],
  },
  safelist: [
    ...["green", "sky"].map((colour) =>
      range(8, 100, 100).map((i) => {
        return `hover:bg-${colour}-${i}`;
      })
    ),
  ],
});
