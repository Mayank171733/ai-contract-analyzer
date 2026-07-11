const Contract = require("../models/Contract");
const extractText = require("../services/pdfService");
const fs = require("fs");

const uploadContract = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a file",
            });
        }

        const text = await extractText(req.file.path);


        const contract = await Contract.create({
            filename: req.file.originalname,
            filepath: req.file.path,
            uploadedBy: req.user._id,
            extractedText: text,
        });

        res.status(201).json({
            message: "Contract uploaded successfully",
            contract,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Upload failed",
        });
    }
};



// Get all contracts of logged-in user
const getContracts = async (req, res) => {
    try {

        const contracts = await Contract.find({
            uploadedBy: req.user._id
        }).sort({
            createdAt: -1
        });

        if (
            contract.uploadedBy.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        res.json({
            contracts
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to fetch contracts"
        });
    }
};


// Get single contract
const getContract = async (req, res) => {

    try {

        const contract = await Contract.findById(
            req.params.id
        );


        if (!contract) {
            return res.status(404).json({
                message: "Contract not found"
            });
        }


        res.json({
            contract
        });


    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch contract"
        });
    }
};


// Delete contract


const deleteContract = async (req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);

        if (!contract) {
            return res.status(404).json({
                message: "Contract not found",
            });
        }
        // Check ownership
        if (
            contract.uploadedBy.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        // Delete file from uploads folder
        if (fs.existsSync(contract.filepath)) {
            fs.unlinkSync(contract.filepath);
        }

        await contract.deleteOne();

        res.json({
            message: "Contract deleted successfully",
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Delete failed",
        });
    }
};


module.exports = {
    uploadContract,
    getContracts,
    getContract,
    deleteContract
};
