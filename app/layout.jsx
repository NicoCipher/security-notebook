import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "NICOCIPHER — Field Notes",
  description:
    "A working cybersecurity lab notebook. Daily practice, honest write-ups, and what I'm stuck on right now.",
  authors: [{ name: "NicoCipher", url: "https://github.com/NicoCipher" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <main className="max-w-[860px] mx-auto px-5 md:px-8 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
