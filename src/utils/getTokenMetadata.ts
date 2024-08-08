import { PublicKey } from "@solana/web3.js";
import { connection } from "../utils/connection";

import { Metaplex } from "@metaplex-foundation/js";

export default async function (tokenAddress: string) {
  if (tokenAddress == "") return;

  const metaplex = new Metaplex(connection);
  const tokenMetadata = await metaplex
    .nfts()
    .findByMint({ mintAddress: new PublicKey(tokenAddress) });

  return tokenMetadata;
}
