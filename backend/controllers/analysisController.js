const Contract = require("../models/Contract");
const Analysis = require("../models/Analysis");
const analyzeContract = require("../services/aiService");


const analyze = async(req,res)=>{

    try{

        const {contractId}=req.params;


        const contract = await Contract.findById(contractId);


        if(!contract){
            return res.status(404).json({
                message:"Contract not found"
            });
        }


        const result = await analyzeContract(
            contract.extractedText
        );


        const analysis = await Analysis.create({

            contractId:contract._id,

            summary:result.summary,

            riskScore:result.riskScore,

            clauses:result.clauses,

            risks:result.risks,

            recommendations:result.recommendations
        });


        res.json({
            message:"Analysis completed",
            analysis
        });


    }catch(error){

        console.log(error);

        res.status(500).json({
            message:"Analysis failed"
        });
    }

};


module.exports={
    analyze
};