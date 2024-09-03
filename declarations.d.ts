// declarations.d.ts
declare module '@solana-mobile/wallet-adapter-mobile' {
    import { WalletAdapter, WalletAdapterProps } from '@solana/wallet-adapter-base';

    export interface AppIdentity {
        name: string;
        uri: string;
        icon: string;
    }

    export interface SolanaMobileWalletAdapterConfig {
        cluster: string;
        appIdentity: AppIdentity;
        authorizationResultCache?: any; // You can provide a more specific type if needed
        addressSelector?: any; // You can provide a more specific type if needed
        onWalletNotFound?: (adapter: SolanaMobileWalletAdapter) => Promise<void>;
    }

    export class SolanaMobileWalletAdapter implements WalletAdapter {
        constructor(config: SolanaMobileWalletAdapterConfig);
        connect(): Promise<void>;
        disconnect(): Promise<void>;
        signTransaction(transaction: any): Promise<any>;
        signAllTransactions(transactions: any[]): Promise<any[]>;
        sendTransaction(transaction: any, connection: any, options?: any): Promise<string>;
        connected: boolean;
        publicKey: any;
    }

    export function createDefaultAuthorizationResultCache(): any;
    export function createDefaultAddressSelector(): any;
}
