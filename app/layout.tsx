import "./globals.css";
import { WalletContextProvider } from '../context/WalletContext';
import '@solana/wallet-adapter-react-ui/styles.css'; // Default styles for wallet adapter UI

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <WalletContextProvider>
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
}
