let web3;
let address;
const contractAddress = factoryContractAddress;
const contractABI = factoryContractABI;
const ownerAddress = contractOwnerAddress;
let contract;

const logd = (log) => {
  console.log(log);
};

const handleAccountsChanged = (addresses) => {
  logd("handleAccountsChanged: ");
  logd(addresses);

  if (addresses && addresses.length > 0) {
    address = addresses[0];
    logd("metamask is connected");
  } else {
    logd("metamask is not connected");
  }
};

window.addEventListener("load", async () => {
  if (window.ethereum) {
    logd("metamask is detected");
    this.ethereum.on("accountsChanged", handleAccountsChanged);

    try {
      let addresses = await window.ethereum.request({ method: "eth_accounts" });
      handleAccountsChanged(addresses);
    } catch (e) {
      alert(e);
    }

    web3 = new Web3(window.ethereum);
    contract = new web3.eth.Contract(contractABI, contractAddress);
  } else if (typeof window.web3 !== "undefined") {
    alert("old version metamask!");
    web3 = new Web3(window.web3.currentProvider);
  } else {
    alert("Please install metamask app");
  }
});

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
  logd("deployToken");
  const tx = await contract.methods.createToken(
    [ownerAddress, "JJT", "JJT", 18, 100000000],
    false,
    true,
    true,
    false,
    false,
    true
  );
  // const gas = await tx.estimateGas({ from: address });
  const gas = web3.utils.toHex(41000);
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(address);
  const txData = {
    from: address,
    to: contractAddress,
    data: data,
    gas,
    gasPrice,
    nonce,
    chain: "ropsten",
  };

  const receipt = await web3.eth.sendTransaction(txData);

  logd(receipt);
  updateTokenStatus();
};
