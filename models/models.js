const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Subject Schema
const SubjectSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  creditHours: { type: Number, required: true },
});
const Subject = mongoose.model("Subject", SubjectSchema);


const classEnrollmentSchema = new Schema({
  class_id: { type: Schema.Types.ObjectId, ref: "Class", required: true },
  semester: { type: String, required: true },
  year: { type: Number, required: true },
});

// Student Schema
const StudentSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  major: { type: String, required: true },
  class_enrollment_history: [classEnrollmentSchema],
});
const Student = mongoose.model("Student", StudentSchema);

// Teacher Schema
const TeacherSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  subjectsTaught: [{ type: String }],
});
const Teacher = mongoose.model("Teacher", TeacherSchema);

// Class Schema
const ClassSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  subject_id: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
  teacher_id: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
  semester: { type: String, required: true },
  year: { type: Number, required: true },
  student_ids: [{ type: Schema.Types.ObjectId, ref: "Student" }],
});
const Class = mongoose.model("Class", ClassSchema);

// Grade Schemaa
const GradeSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  student_id: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  subject_id: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
  grade: { type: String, required: true },
  semester: { type: String, required: true },
  year: { type: Number, required: true },
});
const Grade = mongoose.model("Grade", GradeSchema);

// add export thingy
module.exports = {
  Subject,
  Student,
  Teacher,
  Class,
  Grade,
};