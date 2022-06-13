const Web3 = require("web3");

const rpcURL = process.env.INFURA_ROPSTEN_ACCESS_TOKEN;
const web3 = new Web3(rpcURL);

web3.eth.getGasPrice().then((result) => {
  console.log("GasPrice: ", web3.utils.fromWei(result, "ether"));
});

console.log("sha3: ", web3.utils.sha3("TTT1"));

console.log("keccak256: ", web3.utils.keccak256("TTT1"));

console.log("random hex: ", web3.utils.randomHex(32));
