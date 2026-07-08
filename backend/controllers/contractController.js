const Contract = require("../models/Contract");
const extractText = require("../services/pdfService");

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


module.exports = {
    uploadContract,
};