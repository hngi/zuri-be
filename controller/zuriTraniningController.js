const ZuriTrainingModel = require('../models/ZuriTrainingModel');
const ZuriTrainingMentorModel = require('../models/ZuriTrainingMentorModel');
const { responseHandler } = require('../utils/responseHandler');
const downloadCSV = require('../utils/jsonToCsv');

const getZuriTraining = async (req, res) => {
  // fetch all zuri training data
  // by @ajibadeabd
  const ZuriTraining = await ZuriTrainingModel.find({}, { __v: 0 });
  if (!ZuriTraining) { responseHandler(res, 'error occur while fecting zuri Traning data'); } else { responseHandler(res, 'all zuritraining data fetch', 200, true, { ZuriTraining }); }
};

const findByNameIntern = (req, res) => {
  ZuriTrainingModel.find({ firstName: req.params.firstName }).then((result) => {
    responseHandler(res, 'Operation successful', 200, true, result);
  }).catch((err) => {
    responseHandler(res, 'Something went wrong', 500, false, err);
  });
};

const filterInternTrainingData = (req, res) => {
  const filterBy = req.params.filterBy.toLowerCase();
  ZuriTrainingModel.find({ track: filterBy }).then((result) => {
    responseHandler(res, 'Operation successful', 200, true, result);
  }).catch((err) => {
    responseHandler(res, 'Something went wrong', 500, false, err);
  });
};

const findByNameMentor = (req, res) => {
  ZuriTrainingMentorModel.find({ firstName: req.params.firstName }).then((result) => {
    responseHandler(res, 'Operation successful', 200, true, result);
  }).catch((err) => {
    responseHandler(res, 'Something went wrong', 500, false, err);
  });
};

const filterMentorTrainingData = (req, res) => {
  const filterBy = req.params.filterBy.toLowerCase();
  ZuriTrainingMentorModel.find({ track: filterBy }).then((result) => {
    responseHandler(res, 'Operation successful', 200, true, result);
  }).catch((err) => {
    responseHandler(res, 'Something went wrong', 500, false, err);
  });
};

// all csv exports function

const getZuriTrainingCSV = async (req, res) => {
  const fields = [
    {
      label: 'FIRST NAME',
      value: 'firstName'
    },
    {
      label: 'LAST NAME',
      value: 'lastName'
    },
    {
      label: 'INTERN EMAIL',
      value: 'email'
    },
    {
      label: 'PHONE NUMBER',
      value: 'phoneNumber'
    },
    {
      label: 'DATE OF BIRTH',
      value: 'dob'
    },
    {
      label: 'COUNTRY',
      value: 'country'
    },
    {
      label: 'ADDRESS',
      value: 'address'
    },
    {
      label: 'CITY',
      value: 'city'
    },
    {
      label: 'STATE',
      value: 'state'
    },
    {
      label: 'ZIP CODE',
      value: 'zipcode'
    },
    {
      label: 'TRACK',
      value: 'track'
    },
    {
      label: 'EMPLOYEMENT STATUS',
      value: 'employmentStatus'
    },
    {
      label: 'CREATED AT',
      value: 'createdAt'
    }
  ];

  const ZuriTraining = await ZuriTrainingModel.find({}, { __v: 0 });
  if (!ZuriTraining) return responseHandler(res, 'error occur while fecting zuri Traning data');
  return downloadCSV(res, 'Zuri-training-interns.csv', fields, ZuriTraining);
};

const getZuriMentorCSV = (req, res) => {
  const fields = [
    {
      label: 'FIRST NAME',
      value: 'firstName'
    },
    {
      label: 'LAST NAME',
      value: 'lastName'
    },
    {
      label: 'EMAIL',
      value: 'email'
    },
    {
      label: 'PHONE NUMBER',
      value: 'phoneNumber'
    },
    {
      label: 'COUNTRY',
      value: 'country'
    },
    {
      label: 'DATE OF BIRTH',
      value: 'dob'
    },
    {
      label: 'APPLICATION STATUS',
      value: 'applicationState'
    },
    {
      label: 'STATE OF RESIDENCE',
      value: 'stateOfResidence'
    },
    {
      label: 'INTEREST',
      value: 'interest'
    },
    {
      label: 'TRACK',
      value: 'track'
    },
    {
      label: 'GENDER',
      value: 'gender'
    },
    {
      label: 'EMPLOYEMENT STATUS',
      value: 'employmentStatus'
    },
    {
      label: 'CV LINK',
      value: 'cvLink'
    },
    {
      label: 'CREATED AT',
      value: 'createdAt'
    }
  ];

  ZuriTrainingMentorModel.find({}, { __v: 0 }).then((result) => downloadCSV(res, 'Zuri-training-interns.csv', fields, ZuriTrainingMentorModel)).catch((err) => {
    responseHandler(res, 'Something went wrong', 500, false, err);
  });
};

const filterInternTrainingDataCSV = (req, res) => {
  const filterBy = req.params.filterBy.toLowerCase();
  const fields = [
    {
      label: 'FIRST NAME',
      value: 'firstName'
    },
    {
      label: 'LAST NAME',
      value: 'lastName'
    },
    {
      label: 'INTERN EMAIL',
      value: 'email'
    },
    {
      label: 'PHONE NUMBER',
      value: 'phoneNumber'
    },
    {
      label: 'DATE OF BIRTH',
      value: 'dob'
    },
    {
      label: 'COUNTRY',
      value: 'country'
    },
    {
      label: 'ADDRESS',
      value: 'address'
    },
    {
      label: 'CITY',
      value: 'city'
    },
    {
      label: 'STATE',
      value: 'state'
    },
    {
      label: 'ZIP CODE',
      value: 'zipcode'
    },
    {
      label: 'TRACK',
      value: 'track'
    },
    {
      label: 'EMPLOYEMENT STATUS',
      value: 'employmentStatus'
    },
    {
      label: 'CREATED AT',
      value: 'createdAt'
    }
  ];

  ZuriTrainingModel.find({ track: filterBy }).then((result) => downloadCSV(res, `${filterBy}-interns-training-track.csv`, fields, result)).catch((err) => {
    responseHandler(res, 'Something went wrong', 500, false, err);
  });
};

const filterMentorTrainingDataCSV = (req, res) => {
  const filterBy = req.params.filterBy.toLowerCase();
  const fields = [
    {
      label: 'FIRST NAME',
      value: 'firstName'
    },
    {
      label: 'LAST NAME',
      value: 'lastName'
    },
    {
      label: 'EMAIL',
      value: 'email'
    },
    {
      label: 'PHONE NUMBER',
      value: 'phoneNumber'
    },
    {
      label: 'COUNTRY',
      value: 'country'
    },
    {
      label: 'DATE OF BIRTH',
      value: 'dob'
    },
    {
      label: 'APPLICATION STATUS',
      value: 'applicationState'
    },
    {
      label: 'STATE OF RESIDENCE',
      value: 'stateOfResidence'
    },
    {
      label: 'INTEREST',
      value: 'interest'
    },
    {
      label: 'TRACK',
      value: 'track'
    },
    {
      label: 'GENDER',
      value: 'gender'
    },
    {
      label: 'EMPLOYEMENT STATUS',
      value: 'employmentStatus'
    },
    {
      label: 'CV LINK',
      value: 'cvLink'
    },
    {
      label: 'CREATED AT',
      value: 'createdAt'
    }
  ];

  ZuriTrainingMentorModel.find({ track: filterBy }).then((result) => downloadCSV(res, `${filterBy}-mentors-training-track.csv`, fields, ZuriTrainingMentorModel)).catch((err) => {
    responseHandler(res, 'Something went wrong', 500, false, err);
  });
};

module.exports = {
  getZuriTraining,
  filterMentorTrainingData,
  filterInternTrainingData,
  findByNameMentor,
  findByNameIntern,
  getZuriTrainingCSV,
  getZuriMentorCSV,
  filterMentorTrainingDataCSV,
  filterInternTrainingDataCSV
};
