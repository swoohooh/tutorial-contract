import Web3 from "web3";
import { ethers } from "ethers";
import {
  ADDRESS_1,
  ADDRESS_2,
  INFURA_PROJECT_ID,
  INFURA_MAINNET_ENDPOINT,
  INFURA_ROPSTEN_ENDPOINT,
  CONTRACT_ABI,
} from "./constants.js";

const addressContract = "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07";
const addressOMG = "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07";

const getInfoFromContractWeb3 = () => {
  const rpcURL = process.env.INFURA_MAINNET_ENDPOINT;
  const web3 = new Web3(rpcURL);
  const contract = new web3.eth.Contract(CONTRACT_ABI, addressContract);

  contract.methods.totalSupply().call((err, result) => {
    console.log("[web3]", "OMG totalSupply: ", result);
  });

  contract.methods.name().call((err, result) => {
    console.log("[web3]", "OMG name: ", result);
  });

  contract.methods
    .symbol()
    .call()
    .then((result) => {
      console.log("[web3]", "OMG symbol: ", result);
    });

  contract.methods
    .balanceOf(addressOMG)
    .call()
    .then((result) => {
      console.log("[web3]", "OMG rich user balance: ", result);
    });
};

const getInfoFromContractEthers = () => {
  const provider = new ethers.providers.InfuraProvider(
    "mainnet",
    INFURA_PROJECT_ID
  );
  const contract = new ethers.Contract(addressContract, CONTRACT_ABI, provider);

  contract.totalSupply().then((totalSupply) => {
    console.log("[ethers]", "OMG totalSupply: ", totalSupply);
  });

  contract.name().then((name) => {
    console.log("[ethers]", "OMG name: ", name);
  });

  contract.symbol().then((symbol) => {
    console.log("[ethers]", "OMG symbol: ", symbol);
  });

  contract.balanceOf(addressOMG).then((balance) => {
    console.log("[ethers]]", "OMG rich user balance: ", balance);
  });
};

getInfoFromContractWeb3();
getInfoFromContractEthers();
