import { Head, Html, Main, NextScript } from 'next/document';

// precisa ver o box-sizing 0

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </Head>

      <body className="bg-gray-50 m-0 p-0">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
