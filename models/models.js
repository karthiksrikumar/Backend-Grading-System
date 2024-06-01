const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Subject Schema
// Represents a subject that can be taught in classes
const SubjectSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true }, // Name of the subject
  creditHours: { type: Number, required: true }, // Number of credit hours for the subject
});
const Subject = mongoose.model("Subject", SubjectSchema);

// Class Enrollment Schema
// Represents a student's enrollment in a specific class for a given semester and year
const classEnrollmentSchema = new Schema({
  class_id: { type: Schema.Types.ObjectId, ref: "Class", required: true }, // Reference to the class
  semester: { type: String, required: true }, // Semester of enrollment (e.g., "Fall", "Spring")
  year: { type: Number, required: true }, // Year of enrollment
});

// Student Schema
// Represents a student in the school system
const StudentSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true }, // Name of the student
  major: { type: String, required: true }, // Student's major
  class_enrollment_history: [classEnrollmentSchema], // Array of class enrollments for the student
});
const Student = mongoose.model("Student", StudentSchema);

// Teacher Schema
// Represents a teacher in the school system
const TeacherSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true }, // Name of the teacher
  subjectsTaught: [{ type: String }], // Array of subjects taught by the teacher
});
const Teacher = mongoose.model("Teacher", TeacherSchema);

// Class Schema
// Represents a class offered in the school system
const ClassSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  subject_id: { type: Schema.Types.ObjectId, ref: "Subject", required: true }, // Reference to the subject of the class
  teacher_id: { type: Schema.Types.ObjectId, ref: "Teacher", required: true }, // Reference to the teacher of the class
  semester: { type: String, required: true }, // Semester in which the class is offered
  year: { type: Number, required: true }, // Year in which the class is offered
  student_ids: [{ type: Schema.Types.ObjectId, ref: "Student" }], // Array of student IDs enrolled in the class
});
const Class = mongoose.model("Class", ClassSchema);

// Grade Schema
// Represents a grade earned by a student in a specific subject
const GradeSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  student_id: { type: Schema.Types.ObjectId, ref: "Student", required: true }, // Reference to the student
  subject_id: { type: Schema.Types.ObjectId, ref: "Subject", required: true }, // Reference to the subject
  grade: { type: String, required: true }, // Grade earned by the student (e.g., "A", "B", "C")
  semester: { type: String, required: true }, // Semester in which the grade was earned
  year: { type: Number, required: true }, // Year in which the grade was earned
});
const Grade = mongoose.model("Grade", GradeSchema);

// Export the models
module.exports = {
  Subject,
  Student,
  Teacher,
  Class,
  Grade,
};
