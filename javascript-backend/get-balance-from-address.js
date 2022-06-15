const Web3 = require("web3");

// const rpcURL = process.env.INFURA_MAINNET_ACCESS_TOKEN;
const rpcURL = process.env.INFURA_ROPSTEN_ACCESS_TOKEN;
const web3 = new Web3(rpcURL);

const address1 = process.env.ETH_ADDRESS_1;
const address2 = process.env.ETH_ADDRESS_2;

web3.eth.getBalance(address1, (err, wei) => {
  var balance = web3.utils.fromWei(wei, "ether");
  console.log("ETH test1 balance:  ", balance);
});

web3.eth.getBalance(address2, (err, wei) => {
  var balance = web3.utils.fromWei(wei, "ether");
  console.log("ETH test2 balance:  ", balance);
});
