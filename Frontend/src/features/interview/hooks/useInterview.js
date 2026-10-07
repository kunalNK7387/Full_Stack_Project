import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportsById,
  deleteInterviewReport,
  generateResumePdf,
} from "../services/interview.api";

import { useContext } from "react";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const {
    loading,
    setLoading,

    reportsLoading,
    setReportsLoading,

    report,
    setReport,

    reports,
    setReports,
  } = context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);

    try {
      const response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      setReport(response.interviewReport);

      return response;
    } catch (err) {
      console.log("Generate report error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async (interviewId) => {
    setLoading(true);

    try {
      const response = await getInterviewReportsById(interviewId);

      setReport(response.interviewReport);

      return response;
    } catch (error) {
      console.log("Get report error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getReports = async () => {
    setReportsLoading(true);

    try {
      console.log("Fetching interview reports...");

      const response = await getAllInterviewReports();

      console.log("Reports API response:", response);

      setReports(response.interviewReports || []);

      return response;
    } catch (error) {
      console.error("Get reports error:", error);

      setReports([]);
    } finally {
      console.log("Finished fetching reports");

      setReportsLoading(false);
    }
  };

  const getResumePdf = async (interviewReportId) => {
    setLoading(true);
    let response = null;
    try {
      response = await generateResumePdf({ interviewReportId });
      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewReportId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteReport = async (interviewId) => {
    try {
      await deleteInterviewReport(interviewId);

      setReports((previousReports) =>
        previousReports.filter((report) => report._id !== interviewId),
      );
    } catch (error) {
      console.error("Delete report error:", error);
      throw error;
    }
  };

  return {
    loading,
    reportsLoading,

    report,
    reports,

    generateReport,
    getReportById,
    getReports,
    deleteReport,
    getResumePdf,
  };
};
