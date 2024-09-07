'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useCallback, useEffect, useState } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css'; // Default styles for wallet adapter UI
import { Connection } from '@solana/web3.js';


export default function Home() {
  const { publicKey } = useWallet();
  const [walletKey, setWalletKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);


  // Function to fetch the user's SOL balance
  const fetchBalance = useCallback(async () => {
    if (publicKey) {
      try {
        // Connect to the Solana cluster
        const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

        // Fetch the balance in lamports (1 SOL = 1e9 lamports)
        const lamports = await connection.getBalance(publicKey);
        
        // Convert lamports to SOL
        setBalance(lamports / 1e9);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    }
  }, [publicKey]);

  useEffect(() => {
    if (publicKey) {
      setWalletKey(publicKey.toBase58());
      fetchBalance();
    }
  }, [publicKey, fetchBalance]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Connect Phantom Wallet</h1>
      <WalletMultiButton />

      {walletKey ? (
        <div>
          <p>Your Public Key: {walletKey}</p>
          {balance !== null ? (
            <p>Your Balance: {balance} SOL</p>
          ) :
            <p>Cant get the user balance</p>
          }
        </div>
      ) : (
        <p>No wallet connected</p>
      )}
    </div>
  );
}
