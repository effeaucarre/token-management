export default function (signature: string) {
  console.log("signature dans display", signature);
  let first4 = signature.substr(0, 4);
  let last4 = signature.substr(-4);

  return (
    '<a href="https://solscan.io/tx/' +
    signature +
    '" target="_blank">' +
    // '?cluster=devnet" target="_blank">' +
    first4 +
    "..." +
    last4 +
    "</a>"
  );
}
