const { responseHandler } = require('../utils/responseHandler');
const Interns = require('../models/ZuriInternModel');
const Admin = require('../models/Admin');
const Mentor = require('../models/ZuriInternMentorModel');

const internMentorApplicationStatusStatistics = (req, res, next) => {
  const approved = {
    mentors: 0,
    interns: 0
  };

  const pending = {
    mentors: 0,
    interns: 0
  };

  const declined = {
    mentors: 0,
    interns: 0
  };

  Interns.find({})
    .then((interns) => {
      if (interns.length) {
        const approvedInterns = interns.filter(
          (intern) => intern.applicationState === 'accepted'
        ).length;
        const declinedInterns = interns.filter(
          (intern) => intern.applicationState === 'declined'
        ).length;
        const pendingInterns = interns.filter(
          (intern) => intern.applicationState === 'pending'
        ).length;
        approved.interns = approvedInterns;
        pending.interns = pendingInterns;
        declined.interns = declinedInterns;
      }
      Mentor.find({})
        .then((mentors) => {
          if (mentors.length) {
            const approvedMentors = mentors.filter(
              (mentor) => mentor.applicationState === 'accepted'
            ).length;
            const declinedMentors = mentors.filter(
              (mentor) => mentor.applicationState === 'declined'
            ).length;
            const pendingMentors = mentors.filter(
              (mentor) => mentor.applicationState === 'pending'
            ).length;

            approved.mentors = approvedMentors;
            pending.mentors = pendingMentors;
            declined.mentors = declinedMentors;
          }
        })
        .catch((err) => responseHandler(
          res,
          403,
          'Failed to fetch Mentors Application status',
          false,
          null
        ))
        .finally(() => {
          const data = {
            approved,
            pending,
            declined
          };
          return responseHandler(res, 'Success', 200, true, data);
        });
    })
    .catch((err) => responseHandler(
      res,
      403,
      'Failed to fetch Interns Application status',
      false,
      null
    ));
};

const internMentorTrackStats = (req, res, next) => {
  const frontEnd = {
    mentors: 0,
    interns: 0
  };

  const backEnd = {
    mentors: 0,
    interns: 0
  };
  const uiUx = {
    mentors: 0,
    interns: 0
  };

  const mobile = {
    mentors: 0,
    interns: 0
  };

  Interns.find({})
    .then((interns) => {
      if (interns.length) {
        const uiuxtrackInternsTrackCount = interns.filter(
          (intern) => intern.track === 'design'
        ).length;
        const mobileInternsTrackCount = interns.filter(
          (intern) => intern.track === 'mobile'
        ).length;
        const frontEndInternsTrackCount = interns.filter(
          (intern) => intern.track === 'frontend'
        ).length;
        const backEndInternsTrackCount = interns.filter(
          (intern) => intern.track === 'backend'
        ).length;

        mobile.interns = mobileInternsTrackCount;
        uiUx.interns = uiuxtrackInternsTrackCount;
        frontEnd.interns = frontEndInternsTrackCount;
        backEnd.interns = backEndInternsTrackCount;
      }
      Mentor.find({})
        .then((mentors) => {
          if (mentors.length) {
            const uiuxtrackMentorsCount = mentors.filter(
              (mentor) => mentor.track === 'design'
            ).length;
            const mobileMentorsCount = mentors.filter(
              (mentor) => mentor.track === 'mobile'
            ).length;
            const frontEndMentorsCount = mentors.filter(
              (mentor) => mentor.track === 'frontend'
            ).length;
            const backEndMentorsCount = mentors.filter(
              (mentor) => mentor.track === 'backend'
            ).length;

            mobile.mentors = mobileMentorsCount;
            uiUx.mentors = uiuxtrackMentorsCount;
            frontEnd.mentors = frontEndMentorsCount;
            backEnd.mentors = backEndMentorsCount;
          }
        })
        .catch((err) => responseHandler(
          res,
          403,
          'Failed to fetch Mentors Track Statictics',
          false,
          null
        ))
        .finally(() => {
          const data = {
            mobile,
            frontEnd,
            backEnd,
            uiUx
          };
          return responseHandler(res, 'Success', 200, true, data);
        });
    })
    .catch((err) => responseHandler(
      res,
      403,
      'Failed to fetch Interns Track Statictics',
      false,
      null
    ));
};

const topAnalytics = (req, res, next) => {
  let internsCount;
  let adminsCount;
  let mentorsCount = 0;

  Interns.find({})
    .then((interns) => {
      internsCount = interns.length;

      Admin.find({})
        .then((admins) => {
          adminsCount = admins.length;

          Mentor.find({})
            .then((mentors) => {
              mentorsCount = mentors.length;
            })
            .catch((err) => responseHandler(
              res,
              'Whoops Failed to fetch Mentors',
              403
            ))
            .finally(() => responseHandler(res, 'Success', 200, true, {
              internsCount,
              adminsCount,
              mentorsCount
            }));
        })
        .catch((err) => responseHandler(res, 'Whoops Failed to fetch Admins', 403));
    })
    .catch((err) => responseHandler(res, 'Whoops Failed to fetch interns', 403));
};
module.exports = {
  topAnalytics,
  internMentorTrackStats,
  internMentorApplicationStatusStatistics
};
