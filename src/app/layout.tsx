import "./globals.css";
import Navbar from "@/components/ui/Navbar";

import Footer from "@/components/ui/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased flex flex-col min-h-screen">
                
        <Navbar />
        
        <div className="bg-gray-800 flex-1">
          {children}
        </div>

        <Footer />

      </body>
    </html>
  );
}
