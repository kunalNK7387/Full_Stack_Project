const mongoose = require("mongoose");

/**
 * - job description schema :String
 * - resume text :String
 * - self  description :String
 *
 * - matchScore : Number
 *
 * - technical question:
 *    [{
 *      question :"",
 *      intention :"",
 *      answer:""
 *      }]
 * - Behavioral question :
 *      [{
 *          question :"",
 *          intention :"",
 *          answer:""
 *      }]
 * - skill gaps : [{
 *      skill:"",
 *      severity:{
 *          typr: String,
 *          enum:["low","medium","high"]
 *      }
 * }]
 * - Prepration plan : [{
 *      day:number,
 *      focus:String,
 *      task:[String]
 *
 * }]
 *
 */

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      require: [true, "Techinical question is require"],
    },
    intention: {
      type: String,
      require: [true, "Intention is require"],
    },
    answer: {
      type: String,
      require: [true, "Answer is require"],
    },
  },
  {
    _id: false,
  },
);

const BehavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      require: [true, "Techinical question is require"],
    },
    intention: {
      type: String,
      require: [true, "Intention is require"],
    },
    answer: {
      type: String,
      require: [true, "Answer is require"],
    },
  },
  {
    _id: false,
  },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is require"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is require"],
    },
  },
  {
    _id: false,
  },
);

const preparationPlanSchema = new mongoose.Schema({
  day: { type: Number, require: [true, "Day is require"] },
  focus: {
    type: String,
    required: [true, "Fouce is require"],
  },
  tasks: [
    {
      type: String,
      required: [true, "Task is require"],
    },
  ],
});

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      require: [true, "Job discription is require "],
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [BehavioralQuestionSchema],
    skillGap: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      require: [true, "Job title is required"],
    },
  },
  {
    timestamps: true,
  },
);

const interviewReportModel = mongoose.model(
  "InterviewReport",
  interviewReportSchema,
);

module.exports = interviewReportModel;
