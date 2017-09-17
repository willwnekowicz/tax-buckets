pragma solidity ^0.4.2;

import './zeppelin/ownership/Ownable.sol';

contract Allocation is Ownable {
  string[] allocationKeys = [
    'military',
    'education',
    'energy',
    'nuclear_weapons',
    'health_human_services',
    'homeland_security',
    'housing_urban_development',
    'justice',
    'nasa',
    'state_department',
    'veterans_affairs',
    'other'
  ];

  struct Allocation {
    uint percentage;
  }

  struct User {
    bool verified;
    mapping (string => Allocation) allocations;
  }

  mapping (address => User) private users;

  function submitAllocations(uint[] inputAllocations) payable returns (bool success) {
    for(uint i = 0; i<12; i++){
      users[msg.sender].allocations[allocationKeys[i]].percentage = inputAllocations[i];
    }
    return true;
  }

//  function getOwnAllocations() constant returns  {
//    return users[msg.sender].allocations
//  }
}
