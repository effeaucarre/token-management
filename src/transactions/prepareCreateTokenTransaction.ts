import { Transaction, PublicKey } from "@solana/web3.js";
import createAccountInstruction from "../instructions/createAccountInstruction";
import createInitializeMintInstruction from "../instructions/createInitializeMintInstruction";
import createAssociatedTokenAccountInstruction from "../instructions/createAssociatedTokenAccountInstruction";
import createMintToInstruction from "../instructions/createMintToInstruction";
import getAssociatedTokenAddress from "../utils/getAssociatedTokenAddress";

export default async function (
  minterWalletAddress: PublicKey,
  mintAddress: PublicKey,
  supply: number,
  decimals: number
) {
  let transaction = new Transaction();

  const createAccountIx = await createAccountInstruction(
    minterWalletAddress,
    mintAddress
  );

  const initMintIx = await createInitializeMintInstruction(
    minterWalletAddress,
    mintAddress,
    decimals
  );

  const associatedDestinationTokenAddr = await getAssociatedTokenAddress(
    minterWalletAddress,
    mintAddress
  );

  const createAtaIx = await createAssociatedTokenAccountInstruction(
    minterWalletAddress,
    mintAddress,
    associatedDestinationTokenAddr
  );

  const mintToIx = await createMintToInstruction(
    minterWalletAddress,
    mintAddress,
    associatedDestinationTokenAddr,
    supply * 10 ** decimals
  );

  transaction.add(createAccountIx);
  transaction.add(initMintIx);
  transaction.add(createAtaIx);
  transaction.add(mintToIx);

  return transaction;
}
