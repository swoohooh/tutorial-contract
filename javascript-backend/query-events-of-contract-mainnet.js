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

const contractAddress = "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07";

const queryEventsOfContractWeb3 = () => {
  const rpcURL = INFURA_MAINNET_ENDPOINT;
  const web3 = new Web3(rpcURL);

  const contract = new web3.eth.Contract(CONTRACT_ABI, contractAddress);

  contract.getPastEvents(
    "AllEvents",
    {
      fromBlock: 14854000,
      toBlock: "latest",
    },
    (err, events) => {
      console.log("[web3]", events.length);
      // events.forEach((event) => {
      //   console.log("[web3]", event["blockNumber"], event["event"]);
      // });
      console.log("[web3]", events[0]["blockNumber"], events[0]["event"]);
      console.log("[web3]", events[10]["blockNumber"], events[10]["event"]);
    }
  );
};

const queryEventsOfContractEthers = () => {
  const provider = new ethers.providers.InfuraProvider(
    "mainnet",
    INFURA_PROJECT_ID
  );
  const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, provider);

  contract.queryFilter(14854000, 14854000).then((events) => {
    console.log("[ethers]", events.length);
    // events.forEach((event) => {
    //   console.log("[ethers]", event["blockNumber"], event["event"]);
    // });
    console.log("[ethers]", events[0]["blockNumber"], events[0]["event"]);
    console.log("[ethers]", events[10]["blockNumber"], events[10]["event"]);
  });
};

queryEventsOfContractWeb3();
queryEventsOfContractEthers();
