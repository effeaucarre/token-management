import { PublicKey } from "@solana/web3.js";
import { createUpdateMetadataAccountV2Instruction } from "@metaplex-foundation/mpl-token-metadata";

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
    updateAuthority: minterWalletAddress,
  };

  let metadataObj = {
    updateMetadataAccountArgsV2: {
      data: {
        ...metadata,
        collection: null,
        uses: null,
      },
      updateAuthority: minterWalletAddress,
      primarySaleHappened: null,
      isMutable: 1,
    },
  };

  var metadataInstruction = await createUpdateMetadataAccountV2Instruction(
    accounts,
    metadataObj
  );

  return metadataInstruction;
}
