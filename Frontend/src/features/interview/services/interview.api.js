import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
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
  FormData.append("jobDescription", jobDescription);
  FormData.append("selfDescription", selfDescription);
  FormData.append("resume", resumeFile);

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
