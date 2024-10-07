import "./globals.css";

export const metadata = {
  title: "DocuChat",
  description: "Ask questions about scanned documents",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
