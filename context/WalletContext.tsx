"use client";

import React, { FC, createContext, useContext, ReactNode, useMemo } from 'react';
import {
    ConnectionProvider,
    WalletProvider,
} from '@solana/wallet-adapter-react';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletError } from '@solana/wallet-adapter-base';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';


interface WalletContextProviderProps {
    children: ReactNode;
}

const WalletContext = createContext({});

export const WalletContextProvider: FC<WalletContextProviderProps> = ({ children }) => {
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = clusterApiUrl(network);
    const wallets = [new PhantomWalletAdapter()];

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                <WalletContext.Provider value={{}}>
                    {children}
                </WalletContext.Provider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export const useWalletContext = () => useContext(WalletContext);