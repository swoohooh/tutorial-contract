import Web3 from "web3";
import { ethers } from "ethers";
import {
  ADDRESS_1,
  ADDRESS_2,
  INFURA_PROJECT_ID,
  INFURA_MAINNET_ENDPOINT,
  INFURA_ROPSTEN_ENDPOINT,
} from "./constants.js";

const getBalanceWeb3Callback = async () => {
  // const rpcURL = INFURA_MAINNET_ENDPOINT;
  const rpcURL = INFURA_ROPSTEN_ENDPOINT;
  const web3 = new Web3(rpcURL);

  await Promise.all([
    web3.eth.getBalance(ADDRESS_1, (err, wei) => {
      var balance = web3.utils.fromWei(wei, "ether");
      console.log("ETH test1 balance:  ", balance);
    }),
    web3.eth.getBalance(ADDRESS_2, (err, wei) => {
      var balance = web3.utils.fromWei(wei, "ether");
      console.log("ETH test2 balance:  ", balance);
    }),
  ]);
};

const getBalanceWeb3 = async () => {
  const rpcURL = INFURA_ROPSTEN_ENDPOINT;
  const web3 = new Web3(rpcURL);

  try {
    const weis = await Promise.all([
      web3.eth.getBalance(ADDRESS_1),
      web3.eth.getBalance(ADDRESS_2),
    ]);

    for (let [key, wei] of Object.entries(weis)) {
      let balance = web3.utils.fromWei(wei, "ether");
      console.log("ETH test" + (parseInt(key) + 1), "balance:  ", balance);
    }
  } catch (e) {
    console.log(e);
  }
};

const getBalanceEthers = async () => {
  const provider = new ethers.providers.InfuraProvider(
    "ropsten",
    INFURA_PROJECT_ID
  );

  try {
    const weis = await Promise.all([
      provider.getBalance(ADDRESS_1),
      provider.getBalance(ADDRESS_2),
    ]);

    for (let [key, wei] of Object.entries(weis)) {
      let balance = ethers.utils.formatEther(wei);
      console.log("ETH test" + (parseInt(key) + 1), "balance:  ", balance);
    }
  } catch (e) {
    console.log(e);
  }
};

console.log("getBalanceWeb3Callback");
await getBalanceWeb3Callback();

console.log("getBalanceWeb3");
await getBalanceWeb3();

console.log("getBalanceEthers");
await getBalanceEthers();
