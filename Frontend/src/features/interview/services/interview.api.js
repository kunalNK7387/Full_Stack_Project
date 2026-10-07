import axios from "axios";

const api = axios.create({
  baseURL: "",
  withCredentials: true,
});

/**
 * @description service to generate interview report based on user self description, resume and job description
 */
export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resumeFile);

  const response = await api.post("/api/interview/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/**
 * @descrtiption Service to gate interview report by interviewId
 */

export const getInterviewReportsById = async (interviewId) => {
  const response = await api.get(`/api/interview/report/${interviewId}`);

  return response.data;
};

/**
 * @description Serice to get all interview report of logged in user
 */

export const getAllInterviewReports = async () => {
  const response = await api.get("/api/interview/");

  return response.data;
};

/**
 * @description Service to  Delete the previous interview report of logged in user.
 */
export const deleteInterviewReport = async (interviewId) => {
  const response = await api.delete(`/api/interview/report/${interviewId}`);

  return response.data;
};

/**
 * @description Service to generated resume pdf based on user self description , resume content and job description.
 */
export const generateResumePdf = async ({ interviewReportId }) => {
  const response = await api.post(
    `/api/interview/resume/pdf/${interviewReportId}`,
    null,
    {
      responseType: "blob",
    },
  );
  return response.data;
};
