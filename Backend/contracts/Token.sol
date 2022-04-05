// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "hardhat/console.sol";

contract CropFarm is ERC1155, ERC1155Supply {
    uint256 public constant NULL = 0;
    uint256 public constant WHEAT = 1;
    uint256 public constant CARROT = 2;
    uint256 public constant MELON = 3;
    uint256 public constant PUMPKIN = 4;

    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        _mint(msg.sender, WHEAT, 1000, "");
        _mint(msg.sender, CARROT, 1000, "");
        _mint(msg.sender, MELON, 1000, "");
        _mint(msg.sender, PUMPKIN, 1000, "");

        // id, growtime, harvest
        uint8[15] memory cropInitInt = [
            0,
            0,
            0,
            1,
            10,
            3,
            2,
            10,
            5,
            3,
            10,
            1,
            4,
            10,
            1
        ];
        // name
        string[5] memory cropInitString = [
            "",
            "Wheat",
            "Carrot",
            "Melon",
            "Pumpkin"
        ];
        //SETUP INT VALUES
        // for # of crops
        for (uint256 i = 1; i <= 4; i += 1) {
            _crops[i].id = cropInitInt[i * 3];
            _crops[i].growTime = cropInitInt[(i * 3) + 1];
            _crops[i].harvest = cropInitInt[(i * 3) + 2];
        }
        // SETUP STRING VALUES
        for (uint256 i = 1; i <= 4; i += 1) {
            _crops[i].name = cropInitString[i];
        }
        _balances[msg.sender][WHEAT].totalBalance = 1000;
        _balances[msg.sender][CARROT].totalBalance = 1000;
        _balances[msg.sender][MELON].totalBalance = 1000;
        _balances[msg.sender][PUMPKIN].totalBalance = 1000;
    }

    // user's available VS planted balance (for each crop)
    struct Balance {
        uint256 totalBalance;
        uint256 stakedBalance;
    }

    // array of # of plots each user has
    struct Land {
        Crop[10] crops;
    }

    // struct that goes into plot
    struct Crop {
        bool exists;
        uint256 id;
        string name;
        uint256 growTime;
        uint256 stakeDate;
    }

    struct cropData {
        uint256 id;
        uint256 growTime;
        uint256 harvest;
        string name;
    }

    mapping(address => mapping(uint256 => Balance)) internal _balances;

    //       ^ crop id          ^ user

    mapping(address => Land) internal _plots;

    //       ^ user

    mapping(uint256 => cropData) internal _crops;

    //      ^ crop id

    // change to INTERNAL for deployment
    mapping(address => uint256) public _plotNum;

    function _safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) internal virtual override {
        require(to != address(0), "ERC1155: transfer to the zero address");
        uint256 fromBalance = _balances[from][id].totalBalance;
        require(
            fromBalance >= amount,
            "ERC1155: insufficient balance for transfer"
        );
        fromBalance = fromBalance - amount;
        // update
        _balances[to][id].totalBalance += amount;
        _balances[from][id].totalBalance = fromBalance;
        // then calls inherited safeTransferFrom
        super._safeTransferFrom(from, to, id, amount, data);
    }

    function viewBalance(
        address _account,
        uint256 _id,
        uint256 _member
    ) public view returns (uint256) {
        if (_member == 0) {
            return _balances[_account][_id].totalBalance;
        } else if (_member == 1) {
            return _balances[_account][_id].stakedBalance;
        } else {
            return 0;
        }
    }

    function viewPlot(address _account, uint256 _id)
        public
        view
        returns (uint256)
    {
        return _plots[_account].crops[_id].id;
    }

    function plant(uint256 _plot, uint256 _id) public {
        require(
            _balances[msg.sender][_id].totalBalance >= 1,
            "Not enough crops to plant!"
        );
        // first time user plants, set starting plot num
        if (_plotNum[msg.sender] == 0) {
            _plotNum[msg.sender] = 3;
        }
        require(_plot < _plotNum[msg.sender], "You don't own enough land!");
        require(
            _plots[msg.sender].crops[_plot].exists != true,
            "This plot is not empty!"
        );
        Crop storage plot = _plots[msg.sender].crops[_plot];
        plot.stakeDate = block.timestamp;
        plot.id = _id;
        plot.name = _crops[_id].name;
        plot.growTime = _crops[_id].growTime;
        plot.exists = true;

        _balances[msg.sender][_id].totalBalance -= 1;
        _balances[msg.sender][_id].stakedBalance += 1;
    }

    function harvest(uint256 _plot) public {
        Crop storage plot = _plots[msg.sender].crops[_plot];
        require(plot.id != 0, "Nothing planted in this plot!");
        require(
            (block.timestamp - plot.stakeDate) >= plot.growTime,
            "Crop not done growing."
        );
        uint256 cropId = plot.id;
        _balances[msg.sender][cropId].totalBalance += 2;
        _balances[msg.sender][cropId].stakedBalance -= 1;
        delete _plots[msg.sender].crops[_plot];
    }

    function buyPlot() public {
        require(
            _plotNum[msg.sender] >= 3,
            "User must plant crops once before purchasing plots!"
        );
        _safeTransferFrom(msg.sender, address(this), WHEAT, 10, "");
        _newPlot(msg.sender);
    }

    // change to internal for deployment
    function _newPlot(address _account) internal {
        require(_plotNum[_account] <= 10, "Can't increase number of plots.");
        _plotNum[_account] += 1;
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

    // lets users send crops to this contract
    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes memory
    ) public virtual returns (bytes4) {
        return this.onERC1155Received.selector;
    }
}
