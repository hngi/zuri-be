const ZuriTrainingMentor = require('../models/ZuriTrainingMentorModel');
const { responseHandler } = require('../utils/responseHandler');
const { validationResult } = require('express-validator');

module.exports = {
    createApplication: async (req, res) => {
        try{
            const errors = await validationResult(req);

            if (!errors.isEmpty()) {
                responseHandler(res, { errors: errors.array() });
                return;
            }
            const { 
                firstName, 
                lastName, 
                email, 
                phoneNumber, 
                track, 
                gender, 
                dob, 
                country, 
                cvLink,
                employmentStatus,
                stateOfResidence, 
                intrest
            } = req.body;

            const applicationExist = await ZuriTrainingMentor.findOne({ email });
            if(applicationExist) {
                return responseHandler(res, "Application already exist", 401, false)
            }

            const application = { 
                firstName, 
                lastName, 
                email, 
                phoneNumber, 
                track, 
                gender, 
                dob, 
                country,
                cvLink, 
                employmentStatus,
                stateOfResidence, 
                intrest
            }
            const mentor = await ZuriTrainingMentor.create(application);
            return responseHandler(res, 'Successfully created an Application', 201, true, mentor);
        } catch (err) {
            res.status(500).json({
                error: err
            });
        }
    },

    declineApplication: async (req, res) => {
        try {
            const { id } = req.params;
            const application = await ZuriTrainingMentor.findById({ _id: id});
            if(!application) {
                responseHandler(res, "Mentor's Application not found");
                return;
            }
            application.applicationState = "declined";
            await application.save();

            return responseHandler(res, 'Successfully declined application', 200, true);
        } catch (err) {
            res.status(500).json({
                error: err
            });
        }
    },

    acceptApplication: async (req, res) => {
        try {
            const { id } = req.params;
            const application = await ZuriTrainingMentor.findById({ _id: id});
            if(!application) {
                responseHandler(res, "Mentor's Application not found");
                return;
            }
            application.applicationState = "accepted";
            await application.save();

            return responseHandler(res, 'Successfully accepted application', 200, true);
        } catch (err) {
            res.status(500).json({
                error: err
            });
        }
    },

    allApplication: async (req, res) => {
        try {
            const applications = await ZuriTrainingMentor.find({});
            return responseHandler(res, 'Successfully fetched all applications', 200, true, applications);
        } catch (err) {
            res.status(500).json({
                error: err
            });
        }
    }
}