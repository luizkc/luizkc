import { type MetadataRoute } from "next";

import { getBaseUrl } from "~/lib/getbaseUrl";

export default function manifest(): MetadataRoute.Manifest {
  const baseUrl = getBaseUrl();
  return {
    name: "luizkc",
    short_name: "lkc",
    description: "your next creative developer",
    categories: ["business", "entertainment"],
    icons: [
      {
        src: "icon3.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon4.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#fef2f2",
    background_color: "#121212",
    display: "standalone",
    start_url: baseUrl,
  };
}
