const { text } = require('body-parser');
const { Schema, model } = require ('mongoose');

const departmentSchema = new Schema ({
       departmentName: {
            type: String,
            enum: ['compliance', 'hr', 'other'],
            required: true
        },
        purposeOfProcessing: {
            type: String,
            ref: 'Purpose of Processing'
        },
        legalBasis: {
            type: String,
            ref: 'Legal Basis'
        }
},
    {
        timestamps: true,
    }
);


const Department = model ('Department', departmentSchema);
module.exports = Department;