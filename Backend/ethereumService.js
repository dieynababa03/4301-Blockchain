const {Web3} = require('web3');
const web3 = new Web3('http://127.0.0.1:7545');

const contract = require('../ethereum/build/contracts/Voting.json');

const contractABI = contract.abi;
const contractAddress = contract.networks[5777].address; 


class EthereumService {
    constructor() {
        const privateKey = '29c8d84286e1dfbf41689081253e2bcf07b3a783d90be4f9f963eec63436d33d';
        this.account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
        web3.eth.accounts.wallet.add(this.account);

        // Initialize nonce for the account
        web3.eth.getTransactionCount(this.account.address, 'pending').then((nonce) => {
            this.nonce = nonce;
        });

        const contract = require('../ethereum/build/contracts/Voting.json');
        const networkId = '5777';
        const contractABI = contract.abi;
        const contractAddress = contract.networks[networkId] && contract.networks[networkId].address;
        
        if (!contractAddress || !contractABI) {
            console.error('Contract ABI or Address is missing!');
            return;
        }

        this.contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log('Contract initialized at address:', contractAddress);
    }

    async call(method, params = []) {
        console.log(`Calling method: ${method} with params: ${params}`);
        try {
            return await this.contract.methods[method](...params).call();
        } catch (error) {
            console.error(`Error calling method ${method}:`, error);
            throw error;
        }
    }

    async sendTransaction(method, params = []) {
        console.log(`Sending transaction to method: ${method} with params: ${params}`);
        const data = this.contract.methods[method](...params).encodeABI();
        const tx = {
            from: this.account.address,
            to: this.contract.options.address,
            gas: 1000000, 
            gasPrice: await web3.eth.getGasPrice(), // Fetch current gas price
            nonce: this.nonce, // Use the managed nonce
            data: data
        };

        try {
            const signedTx = await this.account.signTransaction(tx);
            const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            this.nonce++; // Increment nonce only after successful transaction
            return result;
        } catch (error) {
            console.error(`Error sending transaction to method ${method}:`, error);
            throw error;
        }
    }
    
}



module.exports = new EthereumService();

