import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]); // New state for students
  const [selectedLessonId, setSelectedLessonId] = useState(null); // To track which lesson is selected

  // Fetch the list of lessons
  const handleFetchLessons = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/api/v1/attendance/lessons");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();

      // Sort lessons by date_time in descending order (most recent first)
      const sortedLessons = data.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));

      setLessons(sortedLessons);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch students for a specific lesson
  const handleFetchStudents = async (lessonId) => {
    setLoading(true);
    setError(null);
    setSelectedLessonId(lessonId); // Set the selected lesson id
    try {
      const response = await fetch(`http://localhost:8000/api/v1/attendance/lessons/${lessonId}/students`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setStudents(data); // Store students data in state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Export students list to PDF
  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Student List for Lesson ID: ' + selectedLessonId, 20, 20);
    doc.text('Name', 20, 30);
    doc.text('Status', 100, 30);

    students.forEach((student, index) => {
      const yPosition = 40 + (index * 10);
      doc.text(`${student.first_name} ${student.last_name}`, 20, yPosition);
      doc.text(student.status, 100, yPosition);
    });

    doc.save('students-list.pdf');
  };

  return (
    <div className="admin-dashboard">
      {loading ? (
        <div className="loading-container">
          <p>Loading lessons...</p>
        </div>
      ) : (
        <div className="button-container">
          <button className="admin-button" onClick={handleFetchLessons}>
            Lessons Log
          </button>
        </div>
      )}

      {lessons.length > 0 && (
        <div className="lessons-container">
          <h2>Lessons</h2>
          {error && <p className="error-message">{error}</p>}
          <ul className="lessons-list">
            {lessons.map((lesson) => (
              <li
                key={lesson.id}
                className="lesson-item"
                onClick={() => handleFetchStudents(lesson.id)} // Add onClick to fetch students
              >
                <h3>{lesson.subject_per_group_id}</h3>
                <p><strong>Group Number:</strong> {lesson.group_number}</p>
                <p><strong>Professor ID:</strong> {lesson.professor_id}</p>
                <p className="lesson-date"><strong>Date/Time:</strong> {new Date(lesson.date_time).toLocaleString()}</p>
                <p><strong>Status:</strong> {lesson.status}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {students.length > 0 && selectedLessonId && (
        <div className="students-container">
          <h2>Students for Lesson ID: {selectedLessonId}</h2>
          {error && <p className="error-message">{error}</p>}
          <ul className="students-list">
            {students.map((student) => (
              <li key={student.id} className="student-item">
                <p><strong>Name:</strong> {student.first_name} {student.last_name}</p>
                <p><strong>Status:</strong> {student.status}</p>
              </li>
            ))}
          </ul>
          <button className="export-button" onClick={handleExportToPDF}>
            Export to PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
