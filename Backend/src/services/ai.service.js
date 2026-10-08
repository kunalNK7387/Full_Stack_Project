const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const puppeteer = require("puppeteer");

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

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    await page.setContent(htmlContent, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "3mm",
        bottom: "3mm",
        left: "5mm",
        right: "5mm",
      },
    });

    return pdfBuffer;
  } finally {
    await browser.close();
  }
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  const resumePdfSchema = z.object({
    html: z
      .string()
      .describe(
        "The HTML content of the resume which can be converted to PDF using any libeary like puppeteer",
      ),
  });

  const prompt = `Generate  resume  for a candidate with following details :
                Resume:${resume}
                SelfDescription:${selfDescription}
                JobDescription:${jobDescription}
                the response should be a JSON object with a single fild "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                The resume should be tailored for giving the job description and should highlight the candidate's strengths and relevant experience. The HTML should be well-formatted and structured, making it easy to read and visuble appealing.
                The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                You can highlight content using some colors or different font styles  but the overall design should be simple and professional.
                The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                The resume should not be so lengthy , it should ideally be 1-2 pages long when converted to PDF. Foucs on quality rather than quantity and make sure to include all the relevent information that can increase the candidate's chances of getting an interview call for the given job description.
                The resume PDF conten only one page but that one page is completely full. 
                
  `;
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(resumePdfSchema),
    },
  });

  const jsonContent = JSON.parse(response.text);

  const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

  return pdfBuffer;
}
module.exports = { generateInterviewReport, generateResumePdf };
