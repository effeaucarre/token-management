import { PublicKey } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
} from "@solana/spl-token";

export default async function (
  minterWalletAddress: PublicKey,
  mint: PublicKey,
  decimals: number
) {
  return createInitializeMintInstruction(
    mint,
    decimals, // decimals
    minterWalletAddress,
    minterWalletAddress,
    TOKEN_PROGRAM_ID
  );
}
