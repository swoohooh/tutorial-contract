import Web3 from "web3";
import { ethers } from "ethers";
import {
  ADDRESS_1,
  ADDRESS_2,
  INFURA_PROJECT_ID,
  INFURA_MAINNET_ENDPOINT,
  INFURA_ROPSTEN_ENDPOINT,
} from "./constants.js";

const getBlockInfoWeb3Promise = async () => {
  const rpcURL = INFURA_MAINNET_ENDPOINT;
  const web3 = new Web3(rpcURL);

  web3.eth.getBlockNumber().then((blockNumber) => {
    console.log("web3]", "latest block number: ", blockNumber);
  });

  web3.eth.getBlock("latest").then((blockInfo) => {
    console.log("web3]", "latest block info", blockInfo);
  });

  web3.eth.getBlockNumber().then((latest) => {
    for (let i = 0; i < 3; i++) {
      web3.eth.getBlock(latest - i).then((block) => {
        console.log(block["hash"]);
      });
    }
  });

  const hash =
    "0x0990b501575952950e083bb58687af69017dabcc278c57bf7e66d2285bbc5e69";
  web3.eth.getTransactionFromBlock(hash, 2).then(console.log);
};

const getBlockInfoEthers = async () => {
  const provider = new ethers.providers.InfuraProvider(
    "mainnet",
    INFURA_PROJECT_ID
  );

  provider.getBlockNumber().then((blockNumber) => {
    console.log("ethers]", "latest block number: ", blockNumber);
  });

  provider.getBlock("latest").then((blockInfo) => {
    console.log("ethers]", "latest block info", blockInfo);
  });

  provider
    .getBlockNumber()
    .then((latest) => {
      return Promise.all(
        [0, 1, 2].map((i) => {
          return provider.getBlock(latest - i);
        })
      );
    })
    .then((blocks) => {
      blocks.forEach((block) => {
        console.log(block["hash"]);
      });
    });

  const hash =
    "0x0990b501575952950e083bb58687af69017dabcc278c57bf7e66d2285bbc5e69";
  provider
    .getBlock(hash)
    .then((block) => {
      return provider.getTransaction(block["transactions"][2]);
    })
    .then((transaction) => {
      console.log(transaction);
    });
};

getBlockInfoWeb3Promise();
getBlockInfoEthers();
