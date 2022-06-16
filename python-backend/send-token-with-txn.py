# // const sendTokenWeb3Easy = async () => {


# //   const data = contract.methods.transfer(ADDRESS_2, 1000);
# //   const gas = await data.estimateGas({ from: ADDRESS_1 });
# //   const gasPrice = await web3.eth.getGasPrice();

# //   data
# //     .send({ from: ADDRESS_1, gasLimit: gas, gasPrice: gasPrice })
# //     .then((txHash) => {
# //       console.log("[web3]", "txHash:", txHash);
# //       contract.methods.balanceOf(ADDRESS_1).call((err, balance) => {
# //         console.log("[web3][a] ETH test1 contract balance: ", balance);
# //       });

# //       contract.methods.balanceOf(ADDRESS_2).call((err, balance) => {
# //         console.log("[web3][a] ETH test2 contract balance: ", balance);
# //       });
# //     });
# // };


from web3 import Web3
from constants import *

from web3.middleware import construct_sign_and_send_raw_middleware

web3 = Web3(Web3.HTTPProvider(INFURA_ROPSTEN_ENDPOINT))
account = web3.eth.account.from_key(PRIVATE_KEY_STR_1)
web3.middleware_onion.add(construct_sign_and_send_raw_middleware(account))
web3.eth.default_account = account.address

contract_address = "0xB02e478f0ec5E8980A510D514f18c13A42Cf3067"
contract = web3.eth.contract(abi=CONTRACT_ABI, address=contract_address)

balance1 = contract.functions.balanceOf(ADDRESS_1).call()
print(f"ETH test1 contract balance: {balance1}")
balance2 = contract.functions.balanceOf(ADDRESS_2).call()
print(f"ETH test2 contract balance: {balance2}")


tx_hash = contract.functions.transfer(ADDRESS_2, 1000).transact()
print(tx_hash.hex())

tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
print(tx_receipt)


balance1 = contract.functions.balanceOf(ADDRESS_1).call()
print(f"ETH test1 contract balance: {balance1}")
balance2 = contract.functions.balanceOf(ADDRESS_2).call()
print(f"ETH test2 contract balance: {balance2}")
