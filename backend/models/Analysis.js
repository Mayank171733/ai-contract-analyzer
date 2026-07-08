const mongoose = require("mongoose");


const analysisSchema = new mongoose.Schema(
{
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
        String
    ],

    risks:[
        String
    ],

    recommendations:[
        String
    ]

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Analysis",
    analysisSchema
);