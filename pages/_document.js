import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en"  suppressHydrationWarning={true}>
      <Head />
      <body className="antialiased bg-black"   >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
