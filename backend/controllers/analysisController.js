const Contract = require("../models/Contract");
const Analysis = require("../models/Analysis");
const analyzeContract = require("../services/aiService");



const analyze = async (req, res) => {

    try {

        const { contractId } = req.params;

        const contract = await Contract.findById(contractId);

        if (!contract) {
            return res.status(404).json({
                message: "Contract not found"
            });
        }


        if (
            contract.uploadedBy.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }


        const result = await analyzeContract(
            contract.extractedText
        );


        const analysis = await Analysis.create({

            contractId: contract._id,

            summary: result.summary,

            riskScore: result.riskScore,

            clauses: result.clauses,

            risks: result.risks,

            recommendations: result.recommendations
        });


        res.json({
            message: "Analysis completed",
            analysis
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Analysis failed"
        });
    }

};
const getAnalysis = async (req, res) => {
    try {
        const analysis = await Analysis.findOne({
            contractId: req.params.contractId,
        });
        const contract = await Contract.findById(req.params.contractId);

        if (!contract) {
            return res.status(404).json({
                message: "Contract not found"
            });
        }
        if (
            contract.uploadedBy.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        if (!analysis) {
            return res.status(404).json({
                message: "Analysis not found",
            });
        }

        res.json({
            analysis,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch analysis",
        });
    }
};


module.exports = {
    analyze,
    getAnalysis,
};