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

const contractAddress = "0xB02e478f0ec5E8980A510D514f18c13A42Cf3067";

const queryEventsOfContractWeb3 = () => {
  const rpcURL = INFURA_ROPSTEN_ENDPOINT;
  const web3 = new Web3(rpcURL);

  const contract = new web3.eth.Contract(CONTRACT_ABI, contractAddress);

  contract.getPastEvents(
    "AllEvents",
    {
      fromBlock: 0,
      toBlock: "latest",
    },
    (err, events) => {
      console.log(events.length);
      events.forEach((event) => {
        console.log("[web3]", event["blockNumber"], event["event"]);
      });
    }
  );
};

const queryEventsOfContractEthers = () => {
  const provider = new ethers.providers.InfuraProvider(
    "ropsten",
    INFURA_PROJECT_ID
  );
  const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, provider);

  contract.queryFilter(0).then((events) => {
    console.log(events.length);
    events.forEach((event) => {
      console.log("[ethers]", event["blockNumber"], event["event"]);
    });
  });
};

queryEventsOfContractWeb3();
queryEventsOfContractEthers();
