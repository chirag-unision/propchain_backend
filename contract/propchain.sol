// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

contract PropChain {
  /**
   * @dev Prints Hello World string
   */
  uint256[] verifiedUsers;

  struct User {
    uint256 uid;
    string aadhar;
  }

  struct Prop {
    uint256 pid;
    uint256 mcn;
  }

  struct PropHistory {
    uint256 phid;
    uint256 closedPrice;
  }

  struct Rating {
    uint rating;
    string timestamp;
    uint rateby;
  }

  mapping (uint256 => User) private users;
  mapping (uint256 => Prop) private props;
  mapping (uint256 => PropHistory[]) private propshistory;
  mapping (uint256 => Rating[]) private tenantratings;
  mapping (uint256 => Rating[]) private ownerratings;


  function print() public pure returns (string memory) {
    return "Hello World!";
  }

  function createUser(uint256 uid, string memory aadhar) public returns (int256) {
    users[uid].uid= uid;
    users[uid].aadhar= aadhar;
    verifiedUsers.push(uid);
    return 100;
  }

  function createProp(uint256 pid, uint256 mcn) public returns (int256) {
    props[pid].pid= pid;
    props[pid].mcn= mcn;
    return 100;
  }

  function getUser() public pure returns (int256) {
    return 10;
  }

  function addTenantRatings(uint256 uid, uint256 rating, string memory timestamp, uint256 rateby) public {
    Rating memory r = Rating({rating: rating, timestamp: timestamp, rateby: rateby});
    tenantratings[uid].push(r);
  }

  function addOwnerRatings(uint256 uid, uint256 rating, string memory timestamp, uint256 rateby) public {
    Rating memory r = Rating({rating: rating, timestamp: timestamp, rateby: rateby});
    ownerratings[uid].push(r);
  }
  

}
