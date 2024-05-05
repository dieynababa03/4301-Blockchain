const Voting = artifacts.require("Voting");

module.exports = function(deployer) {
  deployer.deploy(Voting, "0xE8D71ac54F90b9f82C04649D2fDED509Ee3BDA95");
};
