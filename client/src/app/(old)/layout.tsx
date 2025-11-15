// import type { Metadata } from "next";
// import './globals.css'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'

// export const metadata: Metadata = {
//   title: "NextJs Starter Kit",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }){
// return (
// <html lang="en">
// <body className="bg-gray-50 min-h-screen">
// <Navbar />
// <main className="container mx-auto px-3 mt-6">{children}</main>
// <Footer />
// </body>
// </html>
// )
// }

import { LayoutProvider } from "@/context/LayoutContext";
import LayoutClientWrapper from "@/components/LayoutClientWrapper";

export const metadata = {
  title: "Aashaa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <LayoutProvider>
          <LayoutClientWrapper>{children}</LayoutClientWrapper>
        </LayoutProvider>
      </body>
    </html>
  );
}
