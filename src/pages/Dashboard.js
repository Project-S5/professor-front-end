import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [subjects, setSubjects] = useState({
    'Year 1': '',
    'Year 2': '',
    'Year 3': '',
    'Year 4': '',
  });

  const [selectedSubject, setSelectedSubject] = useState('');

  const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4'];
  const groups = {
    'Year 1': ['Group A', 'Group B'],
    'Year 2': ['Group A', 'Group C'],
    'Year 3': ['Group B'],
    'Year 4': ['Group A', 'Group C'],
  };

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
  };

  return (
    <div className="dashboard-container">
      {/* <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button className="logout-button">Logout</button>
      </div> */}

      <div className="year-container">
        <h2>Select Year and Subject</h2>
        <div className="year-cards">
          {years.map((year) => (
            <div
              key={year}
              className={`year-card ${selectedYear === year ? 'selected' : ''}`}
              onClick={() => handleYearClick(year)}
            >
              <h3>{year}</h3>
              <select
                value={subjects[year]}
                onChange={(e) => handleSubjectChange(year, e.target.value)}
                className="subject-select"
              >
                <option value="">Select Subject</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="English">English</option>
              </select>
            </div>
          ))}
        </div>
      </div>

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
    </div>
  );
};

export default Dashboard;
