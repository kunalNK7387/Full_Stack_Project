const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");
const interviewRouter = require("../routes/interview.routes");

/**
 * @description controller to generate interview report based on user seslf description, resume ans job description
 */
async function generateInterviewReportController(req, res) {
  const resumeContent = await new pdfParse.PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();

  const { selfDescription, jobDescription } = req.body;

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  //  THEN CREATE THE MONGODB DOCUMENT
  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAi,
  });

  res.status(201).json({
    message: "Interview report generated successfully",
    interviewReport,
  });
}

/**
 * @description controller to get report by interviewId
 */

async function generateInterviewReportByIdController(req, res) {
  const { interviewId } = req.params;

  const interviewReport = await interviewReportModel.findOne({
    _id: interviewId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found.",
    });
  }
  res.status(200).json({
    message: "Interview report successfully.",
    interviewReport,
  });
}

/**
 * @description Controller to get all interview reports of logged in users.
 */

async function getAllInterviewReportsController(req, res) {
  try {
    const interviewReports = await interviewReportModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select(
        "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGap -preparationPlan",
      );

    res.status(200).json({
      message: "Interview reports fetched successfully.",
      interviewReports,
    });
  } catch (error) {
    console.error("GET ALL REPORTS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch interview reports.",
    });
  }
}

/**
 * @description Delete an interview report belonging to the logged-in user
 */

async function deleteInterviewReportController(req, res) {
  try {
    const { interviewId } = req.params;

    const deletedReport = await interviewReportModel.findOneAndDelete({
      _id: interviewId,
      user: req.user.id,
    });

    if (!deletedReport) {
      return res.status(404).json({
        message: "Interview report not found.",
      });
    }

    res.status(200).json({
      message: "Interview report deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE REPORT ERROR:", error);

    res.status(500).json({
      message: "Failed to delete interview report.",
    });
  }
}
module.exports = {
  generateInterviewReportController,
  generateInterviewReportByIdController,
  getAllInterviewReportsController,
  deleteInterviewReportController,
};
