from web3 import Web3
from constants import *

contract_address = "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07"
omg_user_address = "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07"

web3 = Web3(Web3.HTTPProvider(INFURA_MAINNET_ENDPOINT))
contract = web3.eth.contract(address=contract_address, abi=CONTRACT_ABI)

totalSupply = contract.functions.totalSupply().call()
print(f'total supply /f (ether): {web3.fromWei(totalSupply, "ether")}')
print(f"total supply: {totalSupply}")

print(f"name: {contract.functions.name().call()}")
print(f"symbol: {contract.functions.symbol().call()}")
print(
    f"rich user balance: "
    f"{contract.functions.balanceOf(omg_user_address).call()}"
)
