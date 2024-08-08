import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import SolanaWallets from "solana-wallets-vue";
// import dotenv from 'dotenv';

// dotenv.config()
// console.log(process.env)

// You can either import the default styles or create your own.
import "solana-wallets-vue/styles.css";

import {
  PhantomWalletAdapter,
  // SlopeWalletAdapter,
  // SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

const walletOptions = {
  wallets: [
    new PhantomWalletAdapter(),
  //   new SlopeWalletAdapter(),
  //   new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
  ],
  autoConnect: true,
};

createApp(App).use(SolanaWallets, walletOptions).mount('#app')
