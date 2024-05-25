// src/web3.js
import Web3 from 'web3';
let web3;

if (typeof window !== 'undefined' && window.ethereum) {
    // Use MetaMask provider
    web3 = new Web3(window.ethereum);
    // Request user permission to connect to their MetaMask account
    window.ethereum.request({ method: 'eth_requestAccounts' });
  } else if (typeof window !== 'undefined' && window.web3) {
    // Use existing web3 provider (legacy)
    web3 = new Web3(window.web3.currentProvider);
  } else {
    // Fallback: use local development provider or Infura
    const provider = new Web3.providers.HttpProvider('http://localhost:8545'); 
    web3 = new Web3(provider);
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
  
  export default web3;

