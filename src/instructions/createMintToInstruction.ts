import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, createMintToInstruction } from "@solana/spl-token";

export default async function (
  minterWalletAddress: PublicKey,
  mint: PublicKey,
  associatedDestinationTokenAddr: PublicKey,
  amount: number
) {
  return createMintToInstruction(
    mint,
    associatedDestinationTokenAddr,
    minterWalletAddress,
    amount, // amount minted
    [],
    TOKEN_PROGRAM_ID
  );
}
