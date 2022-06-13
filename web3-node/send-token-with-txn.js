const Web3 = require("web3");
var Tx = require("ethereumjs-tx").Transaction;

const rpcURL = process.env.INFURA_ROPSTEN_ACCESS_TOKEN;
const web3 = new Web3(rpcURL);

const contractAddress = "0xB02e478f0ec5E8980A510D514f18c13A42Cf3067";

const contractABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "standard",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_from", type: "address" },
      { indexed: true, name: "_to", type: "address" },
      { indexed: false, name: "_value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_owner", type: "address" },
      { indexed: true, name: "_spender", type: "address" },
      { indexed: false, name: "_value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
];

const address1 = process.env.ETH_ADDRESS_1;
const address2 = process.env.ETH_ADDRESS_2;

const privateKey1 = Buffer.from(process.env.ETH_PRIVATE_KEY_1, "hex");
const privateKey2 = Buffer.from(process.env.ETH_PRIVATE_KEY_2, "hex");

const contract = new web3.eth.Contract(contractABI, contractAddress);

contract.methods.balanceOf(address1).call((err, balance) => {
  console.log("[B] ETH test1 contract balance: ", balance);
});

contract.methods.balanceOf(address2).call((err, balance) => {
  console.log("[B] ETH test2 contract balance: ", balance);
});

web3.eth.getTransactionCount(address1, (err, txCount) => {
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(41000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    to: contractAddress,
    data: contract.methods.transfer(address2, 1000).encodeABI(),
  };

  const tx = new Tx(txObject, { chain: "ropsten" });
  tx.sign(privateKey1);

  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("err: ", err);
    console.log("txHash: ", txHash);
  });
});

contract.methods.balanceOf(address1).call((err, balance) => {
  console.log("[A] ETH test1 contract balance: ", balance);
});

contract.methods.balanceOf(address2).call((err, balance) => {
  console.log("[A] ETH test2 contract balance: ", balance);
});
