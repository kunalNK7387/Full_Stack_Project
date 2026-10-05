const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 to 100 indicating how well the candidate's profile matches the job describe.",
    ),

  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical  question can be asked in the interview."),
        intention: z
          .string()
          .describe(
            "The intention of interviewer behind asking this question.",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Behavioral questions that can be asked in the interview along with intention and how to answer them ",
    ),

  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical  question can be asked in the interview."),
        intention: z
          .string()
          .describe(
            "The intention of interviewer behind asking this question.",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Behavioral questions that can be asked in the interview along with intention and how to answer them ",
    ),

  skillGap: z
    .array(
      z.object({
        skill: z
          .string()
          .describe("The skills which the candidates is lacking "),

        severity: z
          .enum(["low", "medium", "high"])
          .describe("The severity of the skill gap, i.e."),
      }),
    )
    .describe(
      "List of  skill gaps in the candidaye's profile along with their severity.",
    ),

  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the prepartion plan, starting from 1 "),

        focus: z
          .string()
          .describe(
            "The main focus of that day in the preparation plan, i.e. data structures,system design, mock interview etc. ",
          ),

        tasks: z
          .array(z.string())
          .describe(
            "List of the tasks to do on this day to follow the preparation plan, i.e. read a specific book.",
          ),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively.",
    ),
  title: z
    .string()
    .describe("The title of job for which the interview report is generated"),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `Generate an interview report for a candidate with the following details: Resume:${resume}
                         Self Description:${selfDescription} 
                         Job Description:${jobDescription}`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  const report = JSON.parse(response.text);

  return report;
}
module.exports = generateInterviewReport;
