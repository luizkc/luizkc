import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

import "./globals.css";

import { ThemeProvider } from "~/components/ui/theme-provider";
import { getBaseUrl } from "~/lib/getbaseUrl";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  description: "your next creative developer",
  // title: {
  //   absolute: "luiz•kc",
  //   default: "luiz•kc",
  //   template: "luiz•kc — %s",
  // },
  title: "luiz•kc",
  openGraph: {
    description: "your next creative developer",
    title: "luiz•kc",
    type: "website",
    url: baseUrl,
    images: [
      {
        url: `${baseUrl}/seo.png`,
        alt: "luiz•kc",
      },
    ],
  },
};

const jsonLd = {
  "@context": "http://schema.org/",
  "@type": "Person",
  name: "luizkc",
  jobTitle: "creative developer",
  url: baseUrl,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning={process.env.NODE_ENV === "development"}
      lang="en"
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <div className="mx-auto max-w-2xl px-4">{children}</div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
