// import "./globals.css";
// import Navbar from "@/components/ui/Navbar";
// import Footer from "@/components/ui/Footer";
// import { SpeedInsights } from "@vercel/speed-insights/next"
// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="pt-BR">
//       {/* <body className="antialiased flex flex-col justify-between min-h-screen"> */}
//       <body className="min-h-full min-h-dvh flex flex-col">
//         <div className="max-w-[1024px] mx-auto w-full min-h-dvh max-h-vh flex flex-col">
//           <Navbar />
          
//           <div className="bg-gray-700 flex-1 flex flex-col">
//             {children}
//           </div>

//           <Footer />
//         </div>
//         <SpeedInsights />
//       </body>
//     </html>
//   );
// }

// app/layout.tsx (ou .js)

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
      {/* A tag <head> é gerenciada pelo Next.js.
        Para adicionar <title> ou <meta>, use o objeto 'metadata'.
        Scripts devem usar o componente <Script>.
      */}
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

      {/* ✅ 2. Adicione os scripts do Google Analytics aqui */}
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