import { PublicKey } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";

export default async function (
  minterWalletAddress: PublicKey,
  mint: PublicKey,
  associatedDestinationTokenAddr: PublicKey
) {
  return createAssociatedTokenAccountInstruction(
    minterWalletAddress, // signer
    associatedDestinationTokenAddr,
    minterWalletAddress, // to
    mint,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
}
