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
  const interviewReports = await interviewReportModel.find(
    { user: req.user.id }
      .sort({ createdAt: -1 })
      .select(
        "-resume -selfDescription -jobDescription -_v -technicalQuestions -behavioralQuestions -skillGap -preparationPlan",
      ),
  );

  res.status(200).json({
    message: "Interview reports fetches successfully.",
    interviewReports,
  });
}
module.exports = {
  generateInterviewReportController,
  generateInterviewReportByIdController,
  getAllInterviewReportsController,
};
