import { PublicKey } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

export default async function (
  minterWalletAddress: PublicKey,
  mint: PublicKey
) {
  return await getAssociatedTokenAddress(
    mint,
    minterWalletAddress, // to
    true,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
}
