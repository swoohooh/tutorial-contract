from web3 import Web3
from constants import *

from web3.middleware import construct_sign_and_send_raw_middleware

web3 = Web3(Web3.HTTPProvider(INFURA_MAINNET_ENDPOINT))


block_number = web3.eth.get_block_number()
print(f"block number: {block_number}")

latest_block = web3.eth.get_block("latest")
print(f"latest block: {latest_block}")

for i in range(3):
    block = web3.eth.get_block(block_number - i)
    print(block["hash"].hex())

hash = "0x0990b501575952950e083bb58687af69017dabcc278c57bf7e66d2285bbc5e69"
transaction = web3.eth.get_transaction_by_block(hash, 2)
print(f"transaction: {transaction}")
