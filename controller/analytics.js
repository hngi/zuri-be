const { responseHandler } = require("../utils/responseHandler");
const Interns = require("../models/ZuriInternModel");
const Admin = require("../models/Admin");
const Mentor = require("../models/ZuriInternMentorModel");

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
};
