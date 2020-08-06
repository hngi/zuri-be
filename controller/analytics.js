const { responseHandler } = require("../utils/responseHandler");
const Interns = require("../models/ZuriInternModel");
const Admin = require("../models/Admin");
const Mentor = require("../models/ZuriInternMentorModel");


const internMentorTrackStats = (req, res, next) => {
  let frontEnd = {
    mentors: 0,
    interns: 0,
  };

  let backEnd = {
    mentors: 0,
    interns: 0,
  };
  let uiUx = {
    mentors: 0,
    interns: 0,
  };

  let mobile = {
    mentors: 0,
    interns: 0,
  };

  Interns.find({})
    .then((interns) => {
      if (interns.length) {
        const uiuxtrackInternsTrackCount = interns.filter(
          (intern) => intern.track === "design"
        ).length;
        const mobileInternsTrackCount = interns.filter(
          (intern) => intern.track === "mobile"
        ).length;
        const frontEndInternsTrackCount = interns.filter(
          (intern) => intern.track === "frontend"
        ).length;
        const backEndInternsTrackCount = interns.filter(
          (intern) => intern.track === "backend"
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
              (mentor) => mentor.track === "design"
            ).length;
            const mobileMentorsCount = mentors.filter(
              (mentor) => mentor.track === "mobile"
            ).length;
            const frontEndMentorsCount = mentors.filter(
              (mentor) => mentor.track === "frontend"
            ).length;
            const backEndMentorsCount = mentors.filter(
              (mentor) => mentor.track === "backend"
            ).length;

            mobile.mentors = mobileMentorsCount;
            uiUx.mentors = uiuxtrackMentorsCount;
            frontEnd.mentors = frontEndMentorsCount;
            backEnd.mentors = backEndMentorsCount;
          }
        })
        .catch((err) => {
          return responseHandler(
            res,
            403,
            "Failed to fetch Mentors Track Statictics",
            false,
            null
          );
        })
        .finally(() => {
          const data = {
            mobile,
            frontEnd,
            backEnd,
            uiUx,
          };
          return responseHandler(res, "Success", 200, true, data);
        });
    })
    .catch((err) => {
      return responseHandler(
        res,
        403,
        "Failed to fetch Interns Track Statictics",
        false,
        null
      );
    });
};



const topAnalytics = (req, res, next) => {
  let internsCount,
    adminsCount,
    mentorsCount = 0;

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
            .catch((err) => {
              return responseHandler(
                res,
                "Whoops Failed to fetch Mentors",
                403
              );
            })
            .finally(() => {
              return responseHandler(res, "Success", 200, true, {
                internsCount,
                adminsCount,
                mentorsCount,
              });
            });
        })
        .catch((err) => {
          return responseHandler(res, "Whoops Failed to fetch Admins", 403);
        });
    })
    .catch((err) => {
      return responseHandler(res, "Whoops Failed to fetch interns", 403);
    });
};
module.exports = {
  topAnalytics,

internMentorTrackStats,
};
