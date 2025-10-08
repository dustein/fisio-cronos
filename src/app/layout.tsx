import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* <body className="antialiased flex flex-col justify-between min-h-screen"> */}
      <body className="min-h-full min-h-dvh flex flex-col">
        <div className="max-w-[1024px] mx-auto w-full min-h-dvh max-h-vh flex flex-col">
          <Navbar />
          
          <div className="bg-gray-700 flex-1 flex flex-col">
            {children}
          </div>

          <Footer />
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}
