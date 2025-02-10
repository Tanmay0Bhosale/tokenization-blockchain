// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tokenization {
    struct TokenData {
        uint256 tokenId;
        string originalDataHash;
        uint256 timestamp;
        address createdBy;
    }

    mapping(uint256 => TokenData) private tokenList;
    mapping(address => uint256[]) private userTokens; // Track token IDs per user
    uint256 public tokenCounter;

    event TokenCreated(uint256 tokenId, string originalDataHash, address createdBy, uint256 timestamp);

    function tokenizeData(string memory originalDataHash) public returns (uint256) {
        tokenCounter++;
        tokenList[tokenCounter] = TokenData(tokenCounter, originalDataHash, block.timestamp, msg.sender);
        userTokens[msg.sender].push(tokenCounter); // Store token ID for the user
        emit TokenCreated(tokenCounter, originalDataHash, msg.sender, block.timestamp);
        return tokenCounter;
    }

    function getTokenData(uint256 tokenId) public view returns (string memory) {
    require(tokenId > 0 && tokenId <= tokenCounter, "Invalid token ID");
    return string(tokenList[tokenId].originalDataHash);
}

    function getLastTokenId() public view returns (uint256) {
    return tokenCounter;
}

    function getUserTokens(address user) public view returns (uint256[] memory) {
        return userTokens[user];
    }
}
