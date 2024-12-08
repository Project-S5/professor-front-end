import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

const Dashboard = () => {
<<<<<<< Updated upstream
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [subjects, setSubjects] = useState({
    'Year 1': '',
    'Year 2': '',
    'Year 3': '',
    'Year 4': '',
  });

  const [selectedSubject, setSelectedSubject] = useState('');
=======
  const [subjects, setSubjects] = useState({}); // Store subjects by year
  const [error, setError] = useState("");
  const [expandedYears, setExpandedYears] = useState({}); // Track expanded years
  const [displayedSubjects, setDisplayedSubjects] = useState([]); // Store subjects to display in boxes
  const [selectedSubjectId, setSelectedSubjectId] = useState(null); // Track the selected subject box
  const years = [1, 2, 3, 4, 5, 6]; // Years of university
  const navigate = useNavigate();
>>>>>>> Stashed changes

  // Fetch subjects for a given year
  const fetchSubjects = async (year) => {
    if (!year) return;

<<<<<<< Updated upstream
  // 15 Students in Each Group
  const students = {
    'Group A': [
      'John Doe', 'Jane Smith', 'Alice Brown', 'Bob White', 'Emma Green',
      'Lucas Blue', 'Mia Red', 'Noah Yellow', 'Olivia Purple', 'Liam Orange',
      'Sophia Black', 'Ethan Pink', 'Isabella Grey', 'James Violet', 'Charlotte Indigo',
    ],
    'Group B': [
      'Mason Brown', 'Ella White', 'Daniel Black', 'Amelia Blue', 'Jackson Green',
      'Ava Red', 'Henry Yellow', 'Madison Purple', 'Sebastian Orange', 'Zoe Pink',
      'Elijah Violet', 'Hannah Indigo', 'Leo Grey', 'Victoria Violet', 'Aiden Brown',
    ],
    'Group C': [
      'Lucas Green', 'Emily Black', 'Jack Violet', 'Madeline Yellow', 'Lily Red',
      'Benjamin Purple', 'Chloe Orange', 'Eli Brown', 'Sophia Pink', 'Owen Blue',
      'Charlotte Grey', 'Mason Red', 'Liam Violet', 'Abigail Green', 'Oliver Pink',
    ],
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
    setSelectedGroup(null); // Reset selected group
    setSelectedSubject(subjects[year]); // Reset to the subject of the selected year
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  const handleSubjectChange = (year, subject) => {
    setSubjects((prevSubjects) => ({
      ...prevSubjects,
      [year]: subject,
    }));
    setSelectedSubject(subject); // Update selected subject globally
=======
    try {
      setError(""); // Clear previous errors
      const response = await fetch(
        `http://localhost:8000/api/dashboard/subjects_per_group?year=${year}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to fetch subjects.");
      }

      const data = await response.json();
      setSubjects((prev) => ({ ...prev, [year]: data })); // Store subjects by year
    } catch (err) {
      console.error(`Error fetching subjects for year ${year}:`, err);
      setError(`Error fetching subjects for year ${year}: ${err.message}`);
    }
  };

  // Handle box click and navigate
  const handleBoxClick = (subjectId, groupNumber) => {
    // Only navigate if the clicked subject is different from the previously selected one
    if (subjectId !== selectedSubjectId) {
      setSelectedSubjectId(subjectId); // Update selected subject
      navigate(`/lessons/${subjectId}/?group_number=${groupNumber}`);
    }
  };

  // Toggle year dropdown and fetch subjects
  const toggleYearDropdown = (year) => {
    setExpandedYears((prev) => {
      const isExpanded = !!prev[year];
      if (!isExpanded) fetchSubjects(year); // Fetch subjects only when opening
      return { ...prev, [year]: !isExpanded };
    });
  };

  const handleSubjectClick = (title, year) => {
    const filteredSubjects = subjects[year]?.filter(
      (subject) => subject.subject_title === title
    );
    setDisplayedSubjects(filteredSubjects || []);

    // Collapse the dropdown for the selected year
    setExpandedYears((prev) => ({
      ...prev,
      [year]: false,
    }));
>>>>>>> Stashed changes
  };

  return (
    <div className="dashboard-container">
<<<<<<< Updated upstream
      {/* <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button className="logout-button">Logout</button>
      </div> */}

      <div className="year-container">
        <h2>Select Year and Subject</h2>
        <div className="year-cards">
=======
      <Navbar />
      <div className="content">
        <h2>Professor Dashboard</h2>
        <p>Select a year to view its subjects:</p>
        <div className="dropdowns-container">
>>>>>>> Stashed changes
          {years.map((year) => (
            <div key={year} className="dropdown">
              <button
                className="dropdown-button"
                onClick={() => toggleYearDropdown(year)}
              >
                Year {year}
              </button>
              {expandedYears[year] && (
                <div className="dropdown-content">
                  {subjects[year] ? (
                    [...new Set(subjects[year].map((sub) => sub.subject_title))].map(
                      (title, index) => (
                        <button
                          key={index}
                          className="subject-button"
                          onClick={() => handleSubjectClick(title, year)}
                        >
                          {title}
                        </button>
                      )
                    )
                  ) : (
                    <p className="loading-text">Loading subjects...</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {displayedSubjects.length > 0 && (
          <div className="selected-subjects-container">
            <h3>{displayedSubjects[0].subject_title}</h3> {/* Use the title of the first subject */}
            <div className="subject-boxes">
              {displayedSubjects.map((subject, index) => (
                <div
                  key={index}
                  className={`subject-details-box ${selectedSubjectId === subject.id ? "selected" : ""}`}
                  onClick={() => handleBoxClick(subject.id, subject.group_number)} // Handle click to navigate
                >
                  <p>
                    <strong>Subject Title:</strong> {subject.subject_title}
                  </p>
                  <p>
                    <strong>Type:</strong> {subject.type}
                  </p>
                  <p>
                    <strong>Group Number:</strong> {subject.group_number}
                  </p>
                  <p>
                    <strong>Total number of lessons:</strong> {subject.total_lessons_number}
                  </p>
                  <p>
                    <strong>Remaining number of lessons Info:</strong> {subject.remaining_lessons_number}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>
<<<<<<< Updated upstream

      {selectedYear && selectedSubject && (
        <div className="group-container">
          <h2>Groups in {selectedYear}</h2>
          <div className="group-cards">
            {groups[selectedYear].map((group) => (
              <div
                key={group}
                className={`group-card ${selectedGroup === group ? 'selected' : ''}`}
                onClick={() => handleGroupClick(group)}
              >
                {group}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedGroup && (
        <div className="students-container">
          <h2>Students in {selectedGroup}</h2>
          <div className="student-list">
            {students[selectedGroup].map((student, index) => (
              <div key={index} className="student-item">
                <input type="checkbox" />
                <span>{student}</span>
              </div>
            ))}
            <button className="submit-button">Submit Attendance</button>
          </div>
        </div>
      )}
=======
>>>>>>> Stashed changes
    </div>
  );
};

export default Dashboard;
