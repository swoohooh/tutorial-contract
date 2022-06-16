import Web3 from "web3";
import { ContractFactory, ethers } from "ethers";
import {
  ADDRESS_1,
  ADDRESS_2,
  PRIVATE_KEY_1,
  PRIVATE_KEY_2,
  PRIVATE_KEY_STR_1,
  PRIVATE_KEY_STR_2,
  INFURA_PROJECT_ID,
  INFURA_MAINNET_ENDPOINT,
  INFURA_ROPSTEN_ENDPOINT,
  CONTRACT_ABI,
} from "./constants.js";
import { Transaction as Tx } from "ethereumjs-tx";

const sendEthTx = () => {
  const rpcURL = INFURA_ROPSTEN_ENDPOINT;
  const web3 = new Web3(rpcURL);

  web3.eth.getTransactionCount(ADDRESS_1, (err, txCount) => {
    // Build the transaction
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      to: ADDRESS_2,
      value: web3.utils.toHex(web3.utils.toWei("0.05", "ether")),
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    };

    // Sign the transaction
    const tx = new Tx(txObject, { chain: "ropsten" });
    tx.sign(PRIVATE_KEY_1);

    const serializedTx = tx.serialize();
    const raw = "0x" + serializedTx.toString("hex");

    // Broadcast the transaction
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
      console.log("err: ", err);
      console.log("txHash:", txHash);
      // Now go check etherscan to see the transaction!
    });
  });
};

const sendEthWeb3 = async () => {
  const rpcURL = INFURA_ROPSTEN_ENDPOINT;
  const web3 = new Web3(rpcURL);
  web3.eth.accounts.wallet.add(PRIVATE_KEY_STR_1);
  const value = web3.utils.toWei("0.05", "ether");
  const gas = await web3.eth.estimateGas({ value: value });
  const gasPrice = await web3.eth.getGasPrice();

  web3.eth
    .sendTransaction({
      from: ADDRESS_1,
      to: ADDRESS_2,
      value: value,
      gasLimit: gas,
      gasPrice: gasPrice,
    })
    .then((txHash) => {
      console.log("[web3]", "txHash:", txHash);
    });
};

const sendEthEthers = async () => {
  const provider = new ethers.providers.InfuraProvider(
    "ropsten",
    INFURA_PROJECT_ID
  );
  const signer = new ethers.Wallet(PRIVATE_KEY_STR_1, provider);
  const value = ethers.utils.parseEther("0.05");
  const gas = await provider.estimateGas({ value: value });
  const gasPrice = await provider.getGasPrice();

  signer
    .sendTransaction({
      to: ADDRESS_2,
      value: value,
      gasLimit: gas,
      gasPrice: gasPrice,
    })
    .then((transaction) => {
      console.log("[ethers]", "tracsaction prepared");
      return transaction.wait();
    })
    .then((receipt) => {
      console.log("[ethers]", "txHash", receipt);
    });
};

// sendEthTx();
// sendEthWeb3();
sendEthEthers();
