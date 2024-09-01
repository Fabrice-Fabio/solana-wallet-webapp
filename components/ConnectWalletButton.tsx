"use client";

import React, { FC, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletError } from '@solana/wallet-adapter-base';
import { useWalletContext } from '../context/WalletContext';

const ConnectWalletButton: FC = () => {
    const { wallet, connect, disconnect, connected, publicKey } = useWallet();

    useEffect(() => {
        if (connected && publicKey) {
            console.log('Wallet connected:', publicKey.toBase58());
        }
    }, [connected, publicKey]);

    const handleConnect = async () => {
        if (wallet) {
            try {
                await connect();
            } catch (error) {
                console.error('Failed to connect wallet:', (error as WalletError).message);
            }
        }
    };

    const handleMobileConnect = () => {
        const url = `https://phantom.app/ul/browse/${encodeURIComponent(window.location.href)}`;
        window.location.href = url;
    };

    const isMobile = (): boolean => {
        if (typeof window === 'undefined') {
            return false; // If window is undefined, we're on the server, so assume non-mobile.
        }
        const userAgent = window.navigator.userAgent;
        return /iPhone|iPad|iPod|Android/i.test(userAgent);
    };

    return (
        <button
            onClick={isMobile() ? handleMobileConnect : handleConnect}
            disabled={connected}
        >
            {connected ? 'Wallet Connected' : 'Connect Wallet'}
        </button>
    );
};

export default ConnectWalletButton;
