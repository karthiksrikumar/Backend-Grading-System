  const express = require("express");
  const router = express.Router();
  const { Student, Teacher, Class, Grade } = require("../../models/models");
  const mongoose = require("mongoose"); 

  // Helper functions...

  // Students Routes
  router.post("/students", async (req, res) => {
    try {
      const newStudent = new Student(req.body);
      await newStudent.save();
      res.status(201).json(newStudent);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });

  router.get("/students/:studentId/grades", async (req, res) => {
    try {
      const grades = await Grade.find({ student_id: req.params.studentId });
      res.json(grades);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });

  router.get("/students/:studentId/gpa", async (req, res) => {
    try {
      const { studentId } = req.params;
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }

      const grades = await Grade.find({ student_id: studentId });
      const totalGradePoints = grades.reduce((sum, grade) => {
        return sum + gradeToGradePoint(grade.grade);
      }, 0);
      const gpa = totalGradePoints / grades.length;
      res.json({ gpa });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });

  router.get("/students/:studentId/gpa/:semester/:year", async (req, res) => {
    try {
      const { studentId, semester, year } = req.params;
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }

      if (isPastSemester(semester, parseInt(year))) {
        const grades = await Grade.find({
          student_id: studentId,
          semester,
          year: Number(year),
        });
        const totalGradePoints = grades.reduce((sum, grade) => {
          return sum + gradeToGradePoint(grade.grade);
        }, 0);
        const gpa = totalGradePoints / grades.length;
        res.json({ gpa });
      } else {
        res.status(400).json({ error: "Semester and year are not in the past" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });

  // Teachers Routes
  router.post("/teachers", async (req, res) => {
    try {
      const newTeacher = new Teacher(req.body);
      await newTeacher.save();
      res.status(201).json(newTeacher);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });

  router.get("/teachers/:teacherId/classes", async (req, res) => {
    try {
      const classes = await Class.find({ teacher_id: req.params.teacherId });
      res.json(classes);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });

  // Grades Routes
  router.post("/grades", async (req, res) => {
    try {
      const newGrade = new Grade(req.body);
      await newGrade.save();
      res.status(201).json(newGrade);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });

  router.put("/grades/:gradeId", async (req, res) => {
    try {
      // Check if the gradeId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(req.params.gradeId)) {
        return res.status(400).json({ error: "Invalid grade ID" });
      }

      const updatedGrade = await Grade.findByIdAndUpdate(
        req.params.gradeId,
        req.body,
        { new: true }
      );
      res.json(updatedGrade);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });

  // Classes Routes
  router.put("/classes/:classId/enroll", async (req, res) => {
      try {
        // Check if the classId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.classId)) {
          return res.status(400).json({ error: "Invalid class ID" });
        }
    
        // Check if the student_ids are valid ObjectIds
        const invalidStudentIds = req.body.student_ids.filter(
          (id) => !mongoose.Types.ObjectId.isValid(id)
        );
        if (invalidStudentIds.length > 0) {
          return res.status(400).json({ error: "Invalid student IDs" });
        }
      } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
      }
    });
    