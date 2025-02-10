require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { ethers } = require("ethers");
const TokenModel = require("./models/TokenizedData");

const app = express();
app.use(express.json());

//


const CONTRACT_ABI = require("./contractABI.json").abi;
//

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Initialize Blockchain Connection
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

// Tokenization Endpoint
app.post("/tokenize", async (req, res) => {
    try {
        const { sensitiveData } = req.body;
        if (!sensitiveData) return res.status(400).json({ error: "Missing data" });

        // Call contract method (e.g., tokenizeData) on the blockchain
        const transaction = await contract.tokenizeData(sensitiveData);
        const receipt = await transaction.wait();

        res.status(200).json({
            message: "Data tokenized successfully!",
            transactionHash: receipt.transactionHash,
        });
    } catch (error) {
        console.error("Tokenization Error:", error);
        res.status(500).json({ error: "Error while tokenizing data." });
    }
});

app.get("/", (req, res) => res.send("Server is running"));

// Detokenization Endpoint
app.get("/detokenize/:tokenId", async (req, res) => {
    try {
        const { tokenId } = req.params;
        console.log(tokenId);
        const data = await contract.getTokenData(tokenId);
        console.log(data);
        // const tokenEntry = await TokenModel.findOne({ tokenId });
        // if (!tokenEntry) return res.status(404).json({ error: "Token not found" });

        //res.json({ originalData: tokenEntry.originalData });
    } catch (error) {
        console.error("Detokenization Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get Last Token ID
app.get("/lastTokenId", async (req, res) => {
    try {
        const lastTokenId = await contract.getLastTokenId();
        res.json({ lastTokenId: lastTokenId.toString() });
    } catch (error) {
        console.error("Fetch Token ID Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
