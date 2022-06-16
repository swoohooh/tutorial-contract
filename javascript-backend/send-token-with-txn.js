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

const contractAddress = "0xB02e478f0ec5E8980A510D514f18c13A42Cf3067";

const sendTokenWeb3 = async () => {
  const rpcURL = INFURA_ROPSTEN_ENDPOINT;
  const web3 = new Web3(rpcURL);
  web3.eth.accounts.wallet.add(PRIVATE_KEY_STR_1);
  const contract = new web3.eth.Contract(CONTRACT_ABI, contractAddress);

  contract.methods.balanceOf(ADDRESS_1).call((err, balance) => {
    console.log("[web3][b] ETH test1 contract balance: ", balance);
  });
  contract.methods.balanceOf(ADDRESS_2).call((err, balance) => {
    console.log("[web3][b] ETH test2 contract balance: ", balance);
  });

  const data = contract.methods.transfer(ADDRESS_2, 1000);
  const gas = await data.estimateGas({ from: ADDRESS_1 });
  const gasPrice = await web3.eth.getGasPrice();

  web3.eth
    .sendTransaction({
      from: ADDRESS_1,
      to: contractAddress,
      data: data.encodeABI(),
      gasLimit: gas,
      gasPrice: gasPrice,
    })
    .then((txHash) => {
      console.log("[web3]", "txHash:", txHash);
      contract.methods.balanceOf(ADDRESS_1).call((err, balance) => {
        console.log("[web3][a] ETH test1 contract balance: ", balance);
      });

      contract.methods.balanceOf(ADDRESS_2).call((err, balance) => {
        console.log("[web3][a] ETH test2 contract balance: ", balance);
      });
    });
};

const sendTokenWeb3Easy = async () => {
  const rpcURL = INFURA_ROPSTEN_ENDPOINT;
  const web3 = new Web3(rpcURL);
  web3.eth.accounts.wallet.add(PRIVATE_KEY_STR_1);
  const contract = new web3.eth.Contract(CONTRACT_ABI, contractAddress);

  contract.methods.balanceOf(ADDRESS_1).call((err, balance) => {
    console.log("[web3][b] ETH test1 contract balance: ", balance);
  });
  contract.methods.balanceOf(ADDRESS_2).call((err, balance) => {
    console.log("[web3][b] ETH test2 contract balance: ", balance);
  });

  const data = contract.methods.transfer(ADDRESS_2, 1000);
  const gas = await data.estimateGas({ from: ADDRESS_1 });
  const gasPrice = await web3.eth.getGasPrice();

  data
    .send({ from: ADDRESS_1, gasLimit: gas, gasPrice: gasPrice })
    .then((txHash) => {
      console.log("[web3]", "txHash:", txHash);
      contract.methods.balanceOf(ADDRESS_1).call((err, balance) => {
        console.log("[web3][a] ETH test1 contract balance: ", balance);
      });

      contract.methods.balanceOf(ADDRESS_2).call((err, balance) => {
        console.log("[web3][a] ETH test2 contract balance: ", balance);
      });
    });
};

const sendTokenEthers = async () => {
  const provider = new ethers.providers.InfuraProvider(
    "ropsten",
    INFURA_PROJECT_ID
  );
  const signer = new ethers.Wallet(PRIVATE_KEY_STR_1, provider);
  const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);

  contract.balanceOf(ADDRESS_1).then((balance) => {
    console.log("[ethers][b] ETH test1 contract balance: ", balance);
  });
  contract.balanceOf(ADDRESS_2).then((balance) => {
    console.log("[ethers][b] ETH test2 contract balance: ", balance);
  });

  const gas = await contract.estimateGas.transfer(ADDRESS_2, 1000);
  const gasPrice = await provider.getGasPrice();

  contract
    .transfer(ADDRESS_2, 1000, { gasLimit: gas, gasPrice: gasPrice })
    .then((tx) => {
      return tx.wait();
    })
    .then((txHash) => {
      console.log("[ethers]", "txHash:", txHash);
      contract.balanceOf(ADDRESS_1).then((balance) => {
        console.log("[ethers][a] ETH test1 contract balance: ", balance);
      });

      contract.balanceOf(ADDRESS_2).then((balance) => {
        console.log("[ethers][a] ETH test2 contract balance: ", balance);
      });
    });
};

// sendTokenWeb3();
// sendTokenWeb3Easy();
sendTokenEthers();
