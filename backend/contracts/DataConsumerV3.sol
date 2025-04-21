// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

 import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
//import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract DataConsumerV3 {

    mapping(string => AggregatorV3Interface) private dataFeeds;
    
    constructor() {

        // Network: Sepolia
//
// npx hardhat run scripts/deploy.js --network sepolia
// ***** Contract deployed to: 0x81Ba4F6221a456A9dCCCaC773EdFa5A993D5E6aA
        // Aggregators:
        // BTC/USD: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
        // ETH/USD: 0x694AA1769357215DE4FAC081bf1f309aDC325306
        // LINK/USD: 0xc59E3633BAAC79493d908e63626716e204A45EdF
        // BTC/ETH: 0x5fb1616F78dA7aFC9FF79e0371741a747D2a7F22

        dataFeeds["BTC/USD"] = AggregatorV3Interface(0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43);
        dataFeeds["ETH/USD"] = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        dataFeeds["LINK/USD"] = AggregatorV3Interface(0xc59E3633BAAC79493d908e63626716e204A45EdF);
        dataFeeds["BTC/ETH"] = AggregatorV3Interface(0x5fb1616F78dA7aFC9FF79e0371741a747D2a7F22);
    }

    /**
     * Returns the latest answer.
     */
    function getChainlinkDataFeedLatestAnswer(string memory pair) public view returns (int) {
        require(address(dataFeeds[pair]) != address(0), "Data feed not available for this pair");
        (
            /* uint80 roundId */,
            int256 answer,
            /*uint256 startedAt*/,
            /*uint256 updatedAt*/,
            /*uint80 answeredInRound*/
        ) = dataFeeds[pair].latestRoundData();
        return answer;
    }
}
