// components/ConnectWalletButton.tsx
"use client";
import { FC, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const ConnectWalletButton: FC = () => {
  const { wallet, connect, connecting, connected } = useWallet();

  const handleClick = useCallback(() => {
    if (!wallet) return;

    connect().catch((error) => console.error("Error connecting to wallet", error));
  }, [wallet, connect]);

  return (
    <div>
      <WalletMultiButton onClick={handleClick}>
        {connecting ? "Connecting..." : connected ? "Connected" : "Connect Wallet"}
      </WalletMultiButton>
    </div>
  );
};

export default ConnectWalletButton;