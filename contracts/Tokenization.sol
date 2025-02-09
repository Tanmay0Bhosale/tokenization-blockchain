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
    uint256 private tokenCounter;

    event TokenCreated(uint256 tokenId, string originalDataHash, address createdBy, uint256 timestamp);

    function tokenizeData(string memory originalDataHash) public returns (uint256) {
        tokenCounter++;
        tokenList[tokenCounter] = TokenData(tokenCounter, originalDataHash, block.timestamp, msg.sender);
        emit TokenCreated(tokenCounter, originalDataHash, msg.sender, block.timestamp);
        return tokenCounter;
    }

    function getTokenData(uint256 tokenId) public view returns (TokenData memory) {
        require(tokenId > 0 && tokenId <= tokenCounter, "Invalid token ID");
        return tokenList[tokenId];
    }
}
