// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Vault {
    address public user;
    uint public unlockTime;
    address public heir;
    uint public amount;


    constructor(address _heir, uint _unlockTime) payable {
        user = msg.sender;
        heir = _heir;
        unlockTime = _unlockTime;
        amount = msg.value;
    }

    function claim() public  {
        require(msg.sender == heir, "Only heir can claim this");
        require(block.timestamp >= unlockTime, "Funds are not yet available to claim");
        payable(heir).transfer(address(this).balance);
    }

    function deposit() public payable {
        require(msg.sender == user, "Only user can deposit");
        amount = amount + msg.value;
    } 

    function changeBeneficiary(address _newheir) public {
        require(msg.sender == user, "Only the owner can change the heir");
        heir = _newheir;
    }

    function changeUnlockTime(uint _newUnlockTime) public {
        require(msg.sender == user, "Only the owner can change the unlock time");
        unlockTime = _newUnlockTime;
    }

    function withdraw() public {
        require(msg.sender == user, "Only the owner can withdraw remaining funds");
        require(block.timestamp >= unlockTime, "Funds are not yet available to withdraw");
        payable(user).transfer(address(this).balance);
    }
}