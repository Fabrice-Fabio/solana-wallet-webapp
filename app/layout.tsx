import "./globals.css";
import { WalletContext } from '../context/WalletContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <WalletContext>
          {children}
        </WalletContext>
      </body>
    </html>
  );
}
