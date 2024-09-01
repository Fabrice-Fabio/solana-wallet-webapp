// components/ConnectWalletButton.tsx
"use client";

import React, { FC, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletError } from '@solana/wallet-adapter-base';

const ConnectWalletButton: FC = () => {
    const { wallet, connect, connected, publicKey, disconnect } = useWallet();

    useEffect(() => {
        if (connected && publicKey) {
            console.log('Wallet connected:', publicKey.toBase58());
        }
    }, [connected, publicKey]);

    const handleConnect = async () => {
        if (!connected) {
            try {
                await connect();
                console.log('Connected:', publicKey?.toBase58());
            } catch (error) {
                console.error('Failed to connect wallet:', (error as WalletError).message);
            }
        } else {
            console.log('Already connected');
        }
    };

    return (
        <button onClick={handleConnect}>
            {connected ? `Connected: ${publicKey?.toBase58()}` : 'Connect Wallet'}
        </button>
    );
};

export default ConnectWalletButton;
