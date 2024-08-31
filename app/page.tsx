"use client";

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function HomePage() {
    const { connected, publicKey } = useWallet();

    return (
        <div>
            <h1>Welcome to My Solana dApp</h1>
            <WalletMultiButton />
            {connected && <p>Connected account: {publicKey?.toBase58()}</p>}
        </div>
    );
}
