import os


ADDRESS_1 = os.environ["ETH_ADDRESS_1"]
ADDRESS_2 = os.environ["ETH_ADDRESS_2"]


PRIVATE_KEY_STR_1 = os.environ["ETH_PRIVATE_KEY_1"]
PRIVATE_KEY_STR_2 = os.environ["ETH_PRIVATE_KEY_2"]

INFURA_MAINNET_ENDPOINT = os.environ["INFURA_MAINNET_ENDPOINT"]
INFURA_ROPSTEN_ENDPOINT = os.environ["INFURA_ROPSTEN_ENDPOINT"]

CONTRACT_ABI = [
    {
        "constant": True,
        "inputs": [],
        "name": "mintingFinished",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": False,
        "type": "function",
    },
    {
        "constant": True,
        "inputs": [],
        "name": "name",
        "outputs": [{"name": "", "type": "string"}],
        "payable": False,
        "type": "function",
    },
    {
        "constant": False,
        "inputs": [
            {"name": "_spender", "type": "address"},
            {"name": "_value", "type": "uint256"},
        ],
        "name": "approve",
        "outputs": [],
        "payable": False,
        "type": "function",
    },
    {
        "constant": True,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": False,
        "type": "function",
    },
    {
        "constant": False,
        "inputs": [
            {"name": "_from", "type": "address"},
            {"name": "_to", "type": "address"},
            {"name": "_value", "type": "uint256"},
        ],
        "name": "transferFrom",
        "outputs": [],
        "payable": False,
        "type": "function",
    },
    {
        "constant": True,
        "inputs": [],
        "name": "decimals",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": False,
        "type": "function",
    },
    {
        "constant": False,
        "inputs": [],
        "name": "unpause",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": False,
        "type": "function",
    },
    {
        "constant": False,
        "inputs": [
            {"name": "_to", "type": "address"},
            {"name": "_amount", "type": "uint256"},
        ],
        "name": "mint",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": False,
        "type": "function",
    },
    {
        "constant": True,
        "inputs": [],
        "name": "paused",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": False,
        "type": "function",
    },
    {
        "constant": True,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "balance", "type": "uint256"}],
        "payable": False,
        "type": "function",
    },
    {
        "constant": False,
        "inputs": [],
        "name": "finishMinting",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": False,
        "type": "function",
    },
    {
        "constant": False,
        "inputs": [],
        "name": "pause",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": False,
        "type": "function",
    },
    {
        "constant": True,
        "inputs": [],
        "name": "owner",
        "outputs": [{"name": "", "type": "address"}],
        "payable": False,
        "type": "function",
    },
    {
        "constant": True,
        "inputs": [],
        "name": "symbol",
        "outputs": [{"name": "", "type": "string"}],
        "payable": False,
        "type": "function",
    },
    {
        "constant": False,
        "inputs": [
            {"name": "_to", "type": "address"},
            {"name": "_value", "type": "uint256"},
        ],
        "name": "transfer",
        "outputs": [],
        "payable": False,
        "type": "function",
    },
    {
        "constant": False,
        "inputs": [
            {"name": "_to", "type": "address"},
            {"name": "_amount", "type": "uint256"},
            {"name": "_releaseTime", "type": "uint256"},
        ],
        "name": "mintTimelocked",
        "outputs": [{"name": "", "type": "address"}],
        "payable": False,
        "type": "function",
    },
    {
        "constant": True,
        "inputs": [
            {"name": "_owner", "type": "address"},
            {"name": "_spender", "type": "address"},
        ],
        "name": "allowance",
        "outputs": [{"name": "remaining", "type": "uint256"}],
        "payable": False,
        "type": "function",
    },
    {
        "constant": False,
        "inputs": [{"name": "newOwner", "type": "address"}],
        "name": "transferOwnership",
        "outputs": [],
        "payable": False,
        "type": "function",
    },
    {
        "anonymous": False,
        "inputs": [
            {"indexed": True, "name": "to", "type": "address"},
            {"indexed": False, "name": "value", "type": "uint256"},
        ],
        "name": "Mint",
        "type": "event",
    },
    {"anonymous": False, "inputs": [], "name": "MintFinished", "type": "event"},
    {"anonymous": False, "inputs": [], "name": "Pause", "type": "event"},
    {"anonymous": False, "inputs": [], "name": "Unpause", "type": "event"},
    {
        "anonymous": False,
        "inputs": [
            {"indexed": True, "name": "owner", "type": "address"},
            {"indexed": True, "name": "spender", "type": "address"},
            {"indexed": False, "name": "value", "type": "uint256"},
        ],
        "name": "Approval",
        "type": "event",
    },
    {
        "anonymous": False,
        "inputs": [
            {"indexed": True, "name": "from", "type": "address"},
            {"indexed": True, "name": "to", "type": "address"},
            {"indexed": False, "name": "value", "type": "uint256"},
        ],
        "name": "Transfer",
        "type": "event",
    },
]
