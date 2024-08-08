import { Transaction, Signer } from "@solana/web3.js";
import { connection } from "./connection";

import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import { useWallet, initWallet } from "solana-wallets-vue";

const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

initWallet({ wallets, autoConnect: true });
const { publicKey, sendTransaction } = useWallet();

export default async function (
  transaction: Transaction,
  signers: Array<Signer>
) {
  transaction.feePayer = publicKey.value;
  transaction.recentBlockhash = (
    await connection.getRecentBlockhash()
  ).blockhash;

  for (let signer of signers) transaction.sign(signer);

  let signature: string;

  try {
    signature = await sendTransaction(transaction, connection, {
      skipPreflight: true,
    });

    console.log("signature", signature);
    return signature;
  } catch (e) {
    console.log(e);
    return null;
  }
}
