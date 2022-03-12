// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract CropFarm is ERC1155, ERC1155Supply {
    uint256 public constant WHEAT = 0;
    uint256 public constant CARROT = 1;
    uint256 public constant MELON = 2;
    uint256 public constant PUMPKIN = 3;

    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        _mint(msg.sender, WHEAT, 10**18, "");
        _mint(msg.sender, CARROT, 10**27, "");
        _mint(msg.sender, MELON, 1, "");
        _mint(msg.sender, PUMPKIN, 10**9, "");

        _balances[0][msg.sender].totalBalance = 10**18;
    }

    struct Balance {
        uint256 totalBalance;
        uint256 stakedBalance;
        uint256 stakeDate;
    }
    // All normal mint / burn / transfer will read from totalBalance
    // during staking, you move quantities away from totalBalance to stakedBalance

    mapping(uint256 => mapping(address => Balance)) internal _balances;

    //       ^ crop id          ^ user      ^ amount

    function _safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) internal virtual override {
        require(to != address(0), "ERC1155: transfer to the zero address");
        //extra stuff

        uint256 fromBalance = _balances[id][from].totalBalance;
        require(
            fromBalance >= amount,
            "ERC1155: insufficient balance for transfer"
        );
        fromBalance = fromBalance - amount;
        // update
        _balances[id][to].totalBalance += amount;
        _balances[id][from].totalBalance = fromBalance;

        // then calls inherited safeTransferFrom
        super._safeTransferFrom(from, to, id, amount, data);
    }

    function viewValues(
        address _account,
        uint256 _id,
        uint256 _member
    ) public view returns (uint256) {
        if (_member == 0) {
            return _balances[_id][_account].totalBalance;
        } else if (_member == 1) {
            return _balances[_id][_account].stakedBalance;
        } else if (_member == 2) {
            return _balances[_id][_account].stakeDate;
        } else {
            return 0;
        }
    }

    // The following functions are overrides required by Solidity. BASICALLY need this bc of ERC1155Supply
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}

// Leave them with the owner, and use a struct for the token.  Then you will clear the approvals and mark it as locked.  That will be your stake date
