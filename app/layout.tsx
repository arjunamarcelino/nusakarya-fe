import type { Metadata } from "next";
import "../styles/index.css";
import { Providers } from "./providers";
import { Header } from "./_components/Header";

export const metadata: Metadata = {
  title: "NusaKarya",
  description: "Platform untuk sertifikasi dan lisensi karya digital dengan teknologi blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="NusaKarya" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
