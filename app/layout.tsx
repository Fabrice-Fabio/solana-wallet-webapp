'use client';

import "./globals.css";
import { ReactNode, useMemo } from "react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { clusterApiUrl } from "@solana/web3.js";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";



export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const network = 'devnet'; // Can be 'mainnet-beta' or 'testnet'
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <html lang="en">
      <body>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>{children}</WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
