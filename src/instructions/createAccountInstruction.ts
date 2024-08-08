import { SystemProgram, PublicKey } from "@solana/web3.js";
import { connection } from "../utils/connection";
import { TOKEN_PROGRAM_ID, MintLayout } from "@solana/spl-token";

export default async function (
  minterWalletAddress: PublicKey,
  mint: PublicKey
) {
  const rentExemptionAmount =
    await connection.getMinimumBalanceForRentExemption(MintLayout.span);

  return SystemProgram.createAccount({
    fromPubkey: minterWalletAddress,
    newAccountPubkey: mint,
    lamports: rentExemptionAmount,
    space: MintLayout.span,
    programId: TOKEN_PROGRAM_ID,
  });
}
