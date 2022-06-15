const Web3 = require("web3");
var Tx = require("ethereumjs-tx").Transaction;

const rpcURL = process.env.INFURA_MAINNET_ACCESS_TOKEN;
const web3 = new Web3(rpcURL);

web3.eth.getBlockNumber().then((blockNumber) => {
  console.log("latest block number: ", blockNumber);
});

web3.eth.getBlock("latest").then((blockInfo) => {
  console.log(blockInfo);
});

web3.eth.getBlockNumber().then((latest) => {
  for (let i = 0; i < 3; i++) {
    web3.eth.getBlock(latest - i).then(console.log);
  }
});

const hash =
  "0x0990b501575952950e083bb58687af69017dabcc278c57bf7e66d2285bbc5e69";
web3.eth.getTransactionFromBlock(hash, 2).then(console.log);
