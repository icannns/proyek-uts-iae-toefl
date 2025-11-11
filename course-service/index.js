// course-service/index.js

const express = require('express');
const cors = require('cors'); // <-- Nyalakan lagi
const db = require('./db.js');

const app = express();
const port = 3001;

// Nyalakan lagi middleware ini
app.use(cors());
app.use(express.json());


// [GET] /courses
app.get('/courses', (req, res) => {
  const sql = "SELECT * FROM courses";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(results);
  });
});

// [GET] /courses/:id
app.get('/courses/:id', (req, res) => {
  const courseId = req.params.id;
  const sql = "SELECT * FROM courses WHERE course_id = ?";
  
  db.query(sql, [courseId], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(results[0]); 
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Course Service running on http://localhost:${port}`);
});