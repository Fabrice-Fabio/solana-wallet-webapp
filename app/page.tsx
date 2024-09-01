"use client";

import ConnectWalletButton from '@/components/ConnectWalletButton';
import { useWallet } from '@solana/wallet-adapter-react';
import '@solana/wallet-adapter-react-ui/styles.css'; // Default styles for wallet adapter UI




export default function HomePage() {
    const { connected, publicKey } = useWallet();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>Welcome to My Solana dApp</h1>
            <ConnectWalletButton />
            {connected && <p>Connected account: {publicKey?.toBase58()}</p>}
        </div>
    );
}
