import { PublicKey } from "@solana/web3.js";

import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

type metadataArgs = {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: Array<any> | null;
};

export default async function (
  mintAddress: PublicKey,
  minterWalletAddress: PublicKey,
  metadata: metadataArgs
) {
  const [pdaMetadata, bum] = await PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"),
      new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s").toBuffer(),
      mintAddress.toBuffer(),
    ],
    new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")
  );

  var accounts = {
    metadata: pdaMetadata,
    mint: mintAddress,
    mintAuthority: minterWalletAddress,
    payer: minterWalletAddress,
    updateAuthority: minterWalletAddress,
  };

  const metadataObj = {
    createMetadataAccountArgsV3: {
      data: {
        ...metadata,
        collection: null,
        uses: null,
      },
      isMutable: true,
      collectionDetails: { __kind: "V1" },
    },
  };

  var metadataInstruction = await createCreateMetadataAccountV3Instruction(
    accounts,
    metadataObj
  );

  return metadataInstruction;
}
