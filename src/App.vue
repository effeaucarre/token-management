<script setup>
import { Keypair, Transaction, PublicKey } from "@solana/web3.js";

import getTokenMetadata from "./utils/getTokenMetadata";
import createMetadataInstruction from "./instructions/createMetadataInstruction";
import updateMetadataInstruction from "./instructions/updateMetadataInstruction";

import prepareCreateTokenTransaction from "./transactions/prepareCreateTokenTransaction";
import Loader from "./components/Loader.vue";
import Navbar from "./components/Navbar.vue";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import { ref } from "vue";

import { useWallet, initWallet } from "solana-wallets-vue";

const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

initWallet({ wallets, autoConnect: true });
import sendTransaction from "./utils/sendTransaction";
const { publicKey } = useWallet();

const loader = ref(false);
const mintPublicKey = ref(null);
const message = ref(null);
const error = ref(null);

const tokenAddress = ref("");
const symbol = ref("");
const name = ref("");
const uri = ref("");
const supply = ref(1);
const decimals = ref(9);

async function getMetadata() {
  try {
    loader.value = true;
    let metadata = await getTokenMetadata(tokenAddress.value);

    symbol.value = metadata.symbol;
    name.value = metadata.name;
    uri.value = metadata.uri;
  } catch (e) {
    console.log("error", e);
  } finally {
    loader.value = false;
  }
}

async function createToken(withMetadata) {
  message.value = null;
  loader.value = true;

  const minterWalletAddress = publicKey.value;

  var mint = Keypair.generate();
  let transaction = await prepareCreateTokenTransaction(
    minterWalletAddress,
    mint.publicKey,
    supply.value,
    decimals.value
  );

  mintPublicKey.value = mint.publicKey;

  const metadataIx = await createMetadataInstruction(
    mint.publicKey,
    minterWalletAddress,
    {
      name: name.value,
      symbol: symbol.value,
      uri: uri.value,
      sellerFeeBasisPoints: 0,
      creators: null,
    }
  );

  if (withMetadata) transaction.add(metadataIx);

  let signature;

  try {
    signature = await sendTransaction(transaction, [mint]);

    console.log("signature", signature);
    message.value = signature;
  } catch (e) {
    console.log(e);
    loader.value = false;
  }
}

async function createMetadata() {
  message.value = null;
  loader.value = true;

  const metadataInstruction = await createMetadataInstruction(
    new PublicKey(tokenAddress.value)
  );

  let transaction = new Transaction();

  transaction.add(metadataInstruction);

  let signature;

  try {
    signature = await sendTransaction(transaction, []);

    console.log("signature", signature);
    message.value = signature;
  } catch (e) {
    console.log(e);
    loader.value = false;
  }
}

async function updateMetadata() {
  message.value = null;
  loader.value = true;

  const mintAddress = new PublicKey(tokenAddress.value);

  const metadataInstruction = await updateMetadataInstruction(
    mintAddress,
    publicKey.value,
    {
      name: name.value,
      symbol: symbol.value,
      uri: uri.value,
      sellerFeeBasisPoints: 0,
      creators: null,
    }
  );

  let transaction = new Transaction();

  transaction.add(metadataInstruction);

  let signature;

  try {
    signature = await sendTransaction(transaction, []);

    console.log("signature 2", signature);
    message.value = signature;
  } catch (e) {
    console.log(e);
    loader.value = false;
  }
}

function gotIt() {
  loader.value = false;
  message.value = null;
  error.value = null;
}
</script>

<template>
  <Navbar></Navbar>
  <Loader
    :loader="loader"
    :message="message"
    :error="error"
    @gotIt="gotIt"
  ></Loader>
  <template v-if="publicKey === null">
    <h1>First things first, connect your wallet</h1>
  </template>
  <template v-if="publicKey !== null">
    <div class="main-container" :class="{ hasloader: loader === true }">
      <h1>Manage Solana Tokens</h1>

      <div class="stack">
        <div>
          <span
            >Token address
            <span class="help">(Leave empty to create a new token)</span></span
          >
          <input type="text" v-model="tokenAddress" @change="getMetadata" />
        </div>
        <div v-if="tokenAddress == ''">
          <span>Token supply</span>
          <input type="text" v-model="supply" />
        </div>
        <div v-if="tokenAddress == ''">
          <span
            >Token decimals
            <span class="help">(Must be between 0 and 9)</span></span
          >
          <input type="text" v-model="decimals" />
        </div>
        <div>
          <span>Symbol</span>
          <input type="text" v-model="symbol" />
        </div>
        <div>
          <span>Name</span>
          <input type="text" v-model="name" />
        </div>
        <div>
          <span
            >URI Metadata
            <span class="help">(URL of your .json metadata file)</span></span
          >
          <input type="text" v-model="uri" />
        </div>
      </div>
      <br />
      <br />
      <div class="buttons">
        <template v-if="tokenAddress == ''">
          <button type="button" @click="createToken(false)">
            Create Token only
          </button>
          <button type="button" @click="createToken(true)">
            Create Token & Create Metadata
          </button> </template
        ><template v-else>
          <button type="button" @click="createMetadata">Create Metadata</button>
          <button type="button" @click="updateMetadata">Update Metadata</button>
        </template>
      </div>
    </div>
  </template>
</template>

<style scoped>
.main-container {
  width: 1000px;
}

.main-container.hasloader {
  filter: blur(10px);
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.stack div {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
}

.buttons {
  gap: 20px;
  display: flex;
  justify-content: center;
}

input {
  border: 1px solid #ddd;
  padding: 10px;
  width: 250px;
}

.help {
  font-style: italic;
  color: #a0a0a0;
}
</style>
