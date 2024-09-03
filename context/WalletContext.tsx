"use client";
import React, { FC, ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  SolanaMobileWalletAdapter,
  createDefaultAuthorizationResultCache,
  createDefaultAddressSelector,
} from "@solana-mobile/wallet-adapter-mobile";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

interface WalletContextProviderProps {
    children: ReactNode;
}

const WalletContextProvider: FC<WalletContextProviderProps> = ({ children }) => {
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = useMemo(() => clusterApiUrl(network), []);

    const mobileWallet = useMemo(() => {
        const adapter = new SolanaMobileWalletAdapter({
            cluster: network,
            appIdentity: {
                name: "Breakfast",
                uri: "https://rune-on-solana.onrender.com/",
                icon: "https://rune-on-solana.onrender.com/asset/breakfast_mini.png",
            },
            authorizationResultCache: createDefaultAuthorizationResultCache(),
            addressSelector: createDefaultAddressSelector(),
            onWalletNotFound: async (mobileWalletAdapter) => {
                console.error('Wallet not found!');
            },
        });

        // Manually add required properties
        adapter.name = "Solana Mobile Wallet";
        adapter.url = "https://solana.com";
        adapter.icon = "https://rune-on-solana.onrender.com/asset/breakfast_mini.png";
        adapter.ready = true;

        return adapter;
    }, [network]);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[mobileWallet]}>
                {children}
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletContextProvider;
