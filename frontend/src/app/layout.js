import "./globals.css";
import Navbar from "../app/components/Navbar.jsx";
import Footer from "../app/components/Footer.jsx";

export const metadata = {
  title: "MyShop",
  description: "E-commerce frontend with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        <Navbar />
        <main className="container mx-auto px-6 py-10 flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
