import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
        title: {type: String},
        firstName: {type: String},
        lastName: {type: String},
        otherName: {type: String},
        dob: {type: String},
        email : {type: String},
        phone: {type: String},
        address: {type: String},
        subrub: {type: String},
        state: {type: String},
        postalCode: {type: String},
        contactOneName: {type: String},
        contactOnePhone: {type: String},
        contactOneEmail: {type: String},
        contactOneRelation: {type: String},
        contactTwoName: {type: String},
        contactTwoPhone: {type: String},
        contactTwoEmail: {type: String},
        contactTwoRelation: {type: String},
        proofId: {type: String},
        poa: {type: String},
        poaTitle: {type: String},
        poaFirstName: {type: String},
        poaLastName: {type: String},
        poaOtherName: {type: String},
        poaMobileNumber: {type: String},
        poaWorkNumber: {type: String},
        poaPhoneNumber: {type: String},
        poaEmail: {type: String},
    }, { 
        timestamps: true,
    });

const Registration = mongoose.model('Registration', registrationSchema);
export default Registration;