import "./globals.css";

import Footer from "@/components/footer";


export const metadata = {
  title: "Audiophile",
  description: "Frontend mentor Challenge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <div id="modal"></div>
        {children}
        
        <Footer />
      </body>
    </html>
  );
}
