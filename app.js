document.addEventListener('DOMContentLoaded', async function() {
    const address = '0x5f6ae08b8aeb7078cf2f96afb089d7c9f51da47d';
    const etherscanApiKey = 'SZCYARDE5M4R596KMT4ZTUY2FVND5DYIPB';
    let totalUSDValue = 0;

    const updateTotal = (value) => {
        totalUSDValue += value;
        document.getElementById('total').textContent = USDollar.format(totalUSDValue);
    };

    const ETHPrice = await fetch('https://coins.llama.fi/prices/current/coingecko:ethereum')
        .then(response => response.json())
        .then(data => data.coins['coingecko:ethereum'].price)
        .catch(error => {
            console.error('Error fetching ETH price:', error);
            return 0;
        });

    fetchStETHHoldings(ETHPrice, updateTotal);
    fetchMakerDAOValue(updateTotal);

    function fetchStETHHoldings(ETHPrice, callback) {
        fetch(`https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&address=${address}&tag=latest&apikey=${etherscanApiKey}`)
            .then(response => response.json())
            .then(data => {
                const stETHAmount = data.result / 1e18;
                const stETHValueInUSD = stETHAmount * ETHPrice;
                document.getElementById('steth-holdings').textContent = USDollar.format(stETHValueInUSD);
                callback(stETHValueInUSD);
            })
            .catch(error => console.error('Error fetching stETH data:', error));
    }

    async function fetchMakerDAOValue(callback) {
        const infuraProvider = new ethers.providers.JsonRpcProvider('https://ethereum.publicnode.com');
        const contractAddress = '0x5f6ae08b8aeb7078cf2f96afb089d7c9f51da47d';
        const contractABI = [{
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        }, {
            "inputs": [],
            "name": "BridgeIsNotSet",
            "type": "error"
        }, {
            "inputs": [],
            "name": "CallerIsNotStaker",
            "type": "error"
        }, {
            "inputs": [],
            "name": "InsufficientFunds",
            "type": "error"
        }, {
            "inputs": [],
            "name": "SharesNotInitiated",
            "type": "error"
        }, {
            "inputs": [],
            "name": "TransitionIsEnabled",
            "type": "error"
        }, {
            "inputs": [],
            "name": "TransitionNotEnabled",
            "type": "error"
        }, {
            "inputs": [],
            "name": "UserAlreadyTransitioned",
            "type": "error"
        }, {
            "inputs": [],
            "name": "ZeroDeposit",
            "type": "error"
        }, {
            "inputs": [],
            "name": "ZeroSharesIssued",
            "type": "error"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "internalType": "address",
                "name": "previousAdmin",
                "type": "address"
            }, {
                "indexed": false,
                "internalType": "address",
                "name": "newAdmin",
                "type": "address"
            }],
            "name": "AdminChanged",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "beacon",
                "type": "address"
            }],
            "name": "BeaconUpgraded",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            }, {
                "indexed": false,
                "internalType": "uint256",
                "name": "shares",
                "type": "uint256"
            }, {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }],
            "name": "ETHDeposited",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "internalType": "uint8",
                "name": "version",
                "type": "uint8"
            }],
            "name": "Initialized",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            }, {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }],
            "name": "OwnershipTransferStarted",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            }, {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }],
            "name": "OwnershipTransferred",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }],
            "name": "Paused",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            }, {
                "indexed": false,
                "internalType": "uint256",
                "name": "shares",
                "type": "uint256"
            }, {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }, {
                "indexed": false,
                "internalType": "uint256",
                "name": "daiAmount",
                "type": "uint256"
            }],
            "name": "USDDeposited",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }],
            "name": "Unpaused",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "implementation",
                "type": "address"
            }],
            "name": "Upgraded",
            "type": "event"
        }, {
            "inputs": [],
            "name": "CURVE_3POOL",
            "outputs": [{
                "internalType": "contract ICurve3Pool",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "DAI",
            "outputs": [{
                "internalType": "contract IDAI",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "DSR_MANAGER",
            "outputs": [{
                "internalType": "contract IDsrManager",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "LIDO",
            "outputs": [{
                "internalType": "contract ILido",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "PSM",
            "outputs": [{
                "internalType": "contract IDssPsm",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "USDC",
            "outputs": [{
                "internalType": "contract IUSDC",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "USDT",
            "outputs": [{
                "internalType": "contract IUSDT",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "acceptOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "address",
                "name": "user",
                "type": "address"
            }],
            "name": "balanceOf",
            "outputs": [{
                "internalType": "uint256",
                "name": "ethBalance",
                "type": "uint256"
            }, {
                "internalType": "uint256",
                "name": "usdBalance",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "uint256",
                "name": "daiAmount",
                "type": "uint256"
            }],
            "name": "depositDAI",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "uint256",
                "name": "daiAmount",
                "type": "uint256"
            }, {
                "internalType": "uint256",
                "name": "nonce",
                "type": "uint256"
            }, {
                "internalType": "uint256",
                "name": "expiry",
                "type": "uint256"
            }, {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            }, {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            }, {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }],
            "name": "depositDAIWithPermit",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [],
            "name": "depositETH",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "uint256",
                "name": "stETHAmount",
                "type": "uint256"
            }],
            "name": "depositStETH",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "uint256",
                "name": "stETHAmount",
                "type": "uint256"
            }, {
                "internalType": "uint256",
                "name": "allowance",
                "type": "uint256"
            }, {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }, {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            }, {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            }, {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }],
            "name": "depositStETHWithPermit",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "uint256",
                "name": "usdcAmount",
                "type": "uint256"
            }],
            "name": "depositUSDC",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "uint256",
                "name": "usdcAmount",
                "type": "uint256"
            }, {
                "internalType": "uint256",
                "name": "allowance",
                "type": "uint256"
            }, {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }, {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            }, {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            }, {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }],
            "name": "depositUSDCWithPermit",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "uint256",
                "name": "usdtAmount",
                "type": "uint256"
            }, {
                "internalType": "uint256",
                "name": "minDAIAmount",
                "type": "uint256"
            }],
            "name": "depositUSDT",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "address",
                "name": "mainnetBridge",
                "type": "address"
            }],
            "name": "enableTransition",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "name": "ethShares",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "getMainnetBridge",
            "outputs": [{
                "internalType": "contract IMainnetBridge",
                "name": "mainnetBridge",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "address",
                "name": "_staker",
                "type": "address"
            }],
            "name": "initialize",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [],
            "name": "isTransitionEnabled",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "address",
                "name": "from",
                "type": "address"
            }, {
                "internalType": "uint256",
                "name": "nonce",
                "type": "uint256"
            }, {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            }, {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            }, {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }],
            "name": "open",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        }, {
            "inputs": [],
            "name": "owner",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "pause",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [],
            "name": "paused",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "pendingOwner",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "proxiableUUID",
            "outputs": [{
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "address",
                "name": "_staker",
                "type": "address"
            }],
            "name": "setStaker",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }],
            "name": "stakeETH",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }],
            "name": "stakeUSD",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [],
            "name": "staker",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "totalETHBalance",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "totalETHShares",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "totalUSDBalance",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [],
            "name": "totalUSDBalanceNoUpdate",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "totalUSDShares",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [],
            "name": "transition",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "name": "transitioned",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "unpause",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "address",
                "name": "newImplementation",
                "type": "address"
            }],
            "name": "upgradeTo",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "address",
                "name": "newImplementation",
                "type": "address"
            }, {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }],
            "name": "upgradeToAndCall",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "name": "usdShares",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "stateMutability": "payable",
            "type": "receive"
        }];
        const contract = new ethers.Contract(contractAddress, contractABI, infuraProvider);

        try {
            const data = await contract.totalUSDBalanceNoUpdate();
            const makerDAOValueInUSD = data / 1e18;
            document.getElementById('dataOutput').textContent = USDollar.format(makerDAOValueInUSD);
            callback(makerDAOValueInUSD);
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('dataOutput').textContent = 'Error fetching data';
        }
    }
});

let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
});