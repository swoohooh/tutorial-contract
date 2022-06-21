import {
  infuraProjectId,
  factoryContractAddress,
  factoryContractABI,
} from "./tokenfactory-abi.js";

let web3;
let address;
const contractAddress = factoryContractAddress;
const contractABI = factoryContractABI;
let contract;

const logd = (...args) => {
  console.log(args);
};

const handleAccountsChanged = (addresses) => {
  logd("handleAccountsChanged: ", addresses);

  if (addresses && addresses.length > 0) {
    address = addresses[0];
    logd("metamask is connected");
  } else {
    logd("metamask is not connected");
  }
};

window.addEventListener("load", async () => {
  // initMetamask();
  initWalletConnect();
});

const initMetamask = async () => {
  if (window.ethereum) {
    logd("metamask is detected");
    window.ethereum.on("accountsChanged", handleAccountsChanged);

    try {
      let addresses = await window.ethereum.request({ method: "eth_accounts" });
      handleAccountsChanged(addresses);
    } catch (e) {
      alert(e);
    }

    web3 = new Web3(window.ethereum);
    contract = new web3.eth.Contract(contractABI, contractAddress);

    document
      .getElementById("enableMetamaskButton")
      .addEventListener("click", enableMetamask);
    document
      .getElementById("changeEthBalanceButton")
      .addEventListener("click", changeEthBalance);
    document
      .getElementById("deployTokenButton")
      .addEventListener("click", deployToken);
  } else if (typeof window.web3 !== "undefined") {
    alert("old version metamask!");
    web3 = new Web3(window.web3.currentProvider);
  } else {
    alert("Please install metamask app");
  }
};

const initWalletConnect = async () => {
  const provider = new WalletConnectProvider.default({
    infuraId: infuraProjectId,
  });
  window.walletConnectProvider = provider;

  provider.on("accountsChanged", (addresses) => {
    logd("walletconnect [accountsChanged]: ", addresses);
    address = addresses[0];
  });

  provider.on("chainChanged", (chainId) => {
    logd("walletconnect [chainChanged]: ", chainId);
  });

  provider.on("disconnect", (code, reason) => {
    logd("walletconnect [disconnect]: ", code, reason);
  });

  web3 = new Web3(window.walletConnectProvider);
  contract = new web3.eth.Contract(contractABI, contractAddress);

  document
    .getElementById("enableWalletConnectButton")
    .addEventListener("click", enableWalletConnect);
  document
    .getElementById("changeEthBalanceButton2")
    .addEventListener("click", changeEthBalance);
  document
    .getElementById("deployTokenButton")
    .addEventListener("click", deployToken);
};

const enableMetamask = async () => {
  logd("enableMetamask");
  let addresses;
  try {
    addresses = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  } catch (e) {
    alert(e);
  }
};

const enableWalletConnect = async () => {
  logd("enableWalletConnect");
  await window.walletConnectProvider.enable();
};

const getEthBalance = async () => {
  logd("getEthBalance");
  let balance;
  try {
    balance = web3.utils.fromWei(await web3.eth.getBalance(address));
  } catch (e) {
    alert(e);
  }

  logd(balance);

  return balance;
};

const changeEthBalance = async () => {
  let balance = await getEthBalance();
  let div = document.querySelector("#eth-balance");
  div.textContent = balance;
};

const updateTokenStatus = async () => {};

const deployToken = async () => {
  const owner_address = document.querySelector("#owner-address").value;
  const name = document.querySelector("#name").value;
  const symbol = document.querySelector("#symbol").value;
  const decimals = parseInt(document.querySelector("#decimals").value);
  const supply = parseInt(document.querySelector("#supply").value);

  if (!owner_address && !name && !symbol && !decimals && !supply) {
    logd("form empty");
    alert("form empty");
    return;
  }

  deployTokenTransaction(owner_address, name, symbol, decimals, supply);
  updateTokenStatus();
};

const deployTokenTransaction = async (
  owner_address,
  name,
  symbol,
  decimals,
  supply
) => {
  logd("deployTokenTrasaction", owner_address, name, symbol, decimals, supply);

  const tx = await contract.methods.createToken(
    [owner_address, name, symbol, decimals, supply],
    false,
    true,
    true,
    false,
    false,
    true
  );

  const receipt = await tx.send({ from: address });

  logd(receipt);
};
