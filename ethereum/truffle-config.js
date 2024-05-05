module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // Change to 8545 for ganache-cli
      network_id: "*", // Match any network id
    }
  },
  compilers: {
    solc: {
      version: "^0.5.16" // Specify your Solidity version
    }
  }
};
