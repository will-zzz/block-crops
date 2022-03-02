// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract GameItems is ERC1155 {
    uint256 public constant WHEAT = 0;
    uint256 public constant CARROT = 1;
    uint256 public constant MELON = 2;
    uint256 public constant PUMPKIN = 3;

    constructor() public ERC1155("https://game.example/api/item/{id}.json") {
        _mint(msg.sender, WHEAT, 10**18, "");
        _mint(msg.sender, CARROT, 10**27, "");
        _mint(msg.sender, MELON, 1, "");
        _mint(msg.sender, PUMPKIN, 10**9, "");
    }
}

// Leave them with the owner, and use a struct for the token.  Then you will clear the approvals and mark it as locked.  That will be your stake date
