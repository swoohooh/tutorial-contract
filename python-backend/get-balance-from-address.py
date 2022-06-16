from web3 import Web3
from constants import *


web3 = Web3(Web3.HTTPProvider(INFURA_ROPSTEN_ENDPOINT))

wei1 = web3.eth.getBalance(ADDRESS_1)
balance1 = web3.fromWei(wei1, "ether")
print(f"ETH test1 balance {balance1}")

wei2 = web3.eth.getBalance(ADDRESS_2)
balance2 = web3.fromWei(wei2, "ether")
print(f"ETH test2 balance {balance2}")
