const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');
const TokenizedData = require('../models/TokenizedData');
const contractABI = require('../contractABI.json');

// Connect to Ethereum provider
const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);

// **📌 Route to tokenize data**
router.post('/tokenize', async (req, res) => {
    try {
        const { sensitiveData } = req.body;
        if (!sensitiveData) {
            return res.status(400).json({ error: "Missing required field: sensitiveData" });
        }

        // 🔹 Call the tokenizeData function on the smart contract
        const transaction = await contract.tokenizeData(sensitiveData);
        const receipt = await transaction.wait(); // Wait for confirmation

        // 🔹 Store tokenized data in MongoDB
        const newEntry = new TokenizedData({
            originalData: sensitiveData,
            tokenizedData: receipt.transactionHash,
            transactionHash: receipt.transactionHash
        });

        await newEntry.save();

        res.status(200).json({ message: '✅ Data tokenized successfully!', transactionHash: receipt.transactionHash });
    } catch (error) {
        console.error("❌ Error tokenizing data:", error);
        res.status(500).json({ error: 'Error while tokenizing data.' });
    }
});

module.exports = router;
