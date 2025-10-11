import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from 'next/script'; // 👈 1. Importe o componente Script

const GA_MEASUREMENT_ID = "G-EQTFW19848"; // 💡 Mova o ID para uma constante

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">

      <body className="min-h-full min-h-dvh flex flex-col">
        <div className="mx-auto w-full min-h-dvh max-h-vh flex flex-col">
          <Navbar />
          
          <div className="bg-gray-700 flex-1 flex flex-col">
            {children}
          </div>

          <Footer />
        </div>
        <SpeedInsights />
      </body>

      {/* Google Analytics */}
      <Script 
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>

    </html>
  );
}