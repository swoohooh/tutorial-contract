from web3 import Web3
from constants import *

from web3.middleware import construct_sign_and_send_raw_middleware

web3 = Web3(Web3.HTTPProvider(INFURA_ROPSTEN_ENDPOINT))
account = web3.eth.account.from_key(PRIVATE_KEY_STR_1)
web3.middleware_onion.add(construct_sign_and_send_raw_middleware(account))

value = web3.toWei("0.05", "ether")
gas = web3.eth.estimate_gas(
    {"value": value, "from": ADDRESS_1, "to": ADDRESS_2}
)
gas_price = web3.eth.gas_price

tx_hash = web3.eth.sendTransaction(
    {
        "from": ADDRESS_1,
        "to": ADDRESS_2,
        "value": value,
        "gas": gas,
        "gasPrice": gas_price,
    }
)

print(tx_hash.hex())
