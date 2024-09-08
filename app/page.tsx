'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useCallback, useEffect, useState } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css'; // Default styles for wallet adapter UI
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { createMemoInstruction } from '@solana/spl-memo'; // For adding a memo


export default function Home() {
  const { publicKey, sendTransaction } = useWallet();
  const [walletKey, setWalletKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [transactionSignatures, setTransactionSignatures] = useState<string[]>([]);
  const rpc = "https://solana-mainnet.core.chainstack.com/8c40d3506bbc7b836ec2617aebfd33cc";

  // Function to fetch the user's SOL balance
  const fetchBalance = useCallback(async () => {
    if (publicKey) {
      try {
        // Connect to the Solana cluster
        const connection = new Connection(rpc, 'confirmed');

        // Fetch the balance in lamports (1 SOL = 1e9 lamports)
        const lamports = await connection.getBalance(publicKey);
        
        // Convert lamports to SOL
        setBalance(lamports / LAMPORTS_PER_SOL);
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


  const sendTransactionWithMemo = useCallback(async () => {
    if (!publicKey) {
      console.log('No wallet connected');
      return;
    }

    try {
      // Connect to the Solana cluster
      const connection = new Connection(rpc, 'confirmed');

      // Create a transaction object
      const transaction = new Transaction();

      // Define the recipient public key (replace with actual recipient address)
      const recipientPublicKey = new PublicKey('37G4h4AXpgrVMnXTUjaR5r4L3guWEjgc96DuVLzujtLz');

      // Add the transfer instruction (e.g., send 0.01 SOL)
      const sendSolInstruction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: publicKey,
        lamports: 0.00000001 * LAMPORTS_PER_SOL, // Transfer 0.01 SOL (replace with actual amount)
      });

      // Add the instruction to the transaction
      transaction.add(sendSolInstruction);

      // Add a memo instruction to include the memo data in the transaction
      const memo = 'data:,{"p":"fast-20","op":"mint","tick":"fabiotest","amt":1000}';
      const memoInstruction = createMemoInstruction(memo);

      // Add the memo instruction to the transaction
      transaction.add(memoInstruction);

      // Send the transaction
      const signature = await sendTransaction(transaction, connection);

      // Confirm the transaction
      await connection.confirmTransaction(signature, 'confirmed');

      // Set transaction status after successful confirmation
      
      setTransactionSignatures(prevSignatures => [...prevSignatures, signature]);

    } catch (error) {
      console.error('Transaction failed', error);
    }
  }, [publicKey, sendTransaction]);


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
          <br /><br />
          
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button style={{ border: '1px solid orange', padding: '5px'}} onClick={sendTransactionWithMemo}>Click here to mint</button>

            <h3>Minted Transactions:</h3>
            {transactionSignatures.length > 0 ? (
              <ul>
                {transactionSignatures.map((signature, index) => (
                  <li key={index}>
                    <a href={`https://explorer.solana.com/tx/${signature}?cluster=mainnet-beta`} target="_blank" rel="noopener noreferrer">
                      {signature}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No transactions yet</p>
            )}
          </div>

        </div>
      ) : (
        <p>No wallet connected</p>
      )}
    </div>
  );
}
