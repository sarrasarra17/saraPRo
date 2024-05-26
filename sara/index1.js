require('dotenv').config();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://eth-sepolia.g.alchemy.com/v2/J52NOYb-OvEgheV90fVxHVl414W6DxuF"));

const account = web3.eth.accounts.privateKeyToAccount("J52NOYb-OvEgheV90fVxHVl414W6DxuF");
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

const contractABI = [
    [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_email",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_service",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_date",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_time",
                    "type": "string"
                }
            ],
            "name": "bookService",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "bookings",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "email",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "service",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "date",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "time",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getBookings",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "email",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "service",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "date",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "time",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct HandymanContract.Booking[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
];
const contractAddress = '0x1Bf2d3D26a7d717975Af38464a070BD3927cEefE';

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function interactWithContract() {
  const result = await contract.methods.yourMethod().call();
  console.log(result);
}

interactWithContract();
