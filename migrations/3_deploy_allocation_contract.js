var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
var Allocation = artifacts.require("./Allocation.sol");

module.exports = function(deployer) {
  deployer.link(Ownable, Allocation);
  deployer.deploy(Allocation);
};
