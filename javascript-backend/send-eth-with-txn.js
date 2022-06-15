const Web3 = require("web3");
var Tx = require("ethereumjs-tx").Transaction;

const rpcURL = process.env.INFURA_ROPSTEN_ACCESS_TOKEN;
const web3 = new Web3(rpcURL);

const address1 = process.env.ETH_ADDRESS_1;
const address2 = process.env.ETH_ADDRESS_2;

const privateKey1 = Buffer.from(process.env.ETH_PRIVATE_KEY_1, "hex");
const privateKey2 = Buffer.from(process.env.ETH_PRIVATE_KEY_2, "hex");

web3.eth.getTransactionCount(address1, (err, txCount) => {
  // Build the transaction
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: address2,
    value: web3.utils.toHex(web3.utils.toWei("0.1", "ether")),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
  };

  // Sign the transaction
  const tx = new Tx(txObject, { chain: "ropsten" });
  tx.sign(privateKey1);

  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("err: ", err);
    console.log("txHash:", txHash);
    // Now go check etherscan to see the transaction!
  });
});
