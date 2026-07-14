const mongoose = require("mongoose");


const analysisSchema = new mongoose.Schema({

    contractId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Contract",
        required:true
    },


    summary:{
        type:String
    },


    riskScore:{
        type:Number
    },


    clauses:[
        {
            name:String,
            description:String
        }
    ],


    risks:[
        {
            description:String,
            severity:String
        }
    ],


    recommendations:[
        {
            description:String
        }
    ]


});


module.exports = mongoose.model(
    "Analysis",
    analysisSchema
);