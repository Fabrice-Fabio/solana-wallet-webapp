'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css'; // Default styles for wallet adapter UI


export default function Home() {
  const { publicKey } = useWallet();
  const [walletKey, setWalletKey] = useState<string | null>(null);

  useEffect(() => {
    if (publicKey) {
      setWalletKey(publicKey.toString());
    }
  }, [publicKey]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Connect Phantom Wallet</h1>
      <WalletMultiButton />
      {walletKey ? <p>Connected Wallet Public Key: {walletKey}</p> : <p>No wallet connected</p>}
    </div>
  );
}
