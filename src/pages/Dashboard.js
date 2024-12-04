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
  const [absentees, setAbsentees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4'];
  const groups = {
    'Year 1': ['Group A', 'Group B'],
    'Year 2': ['Group A', 'Group C'],
    'Year 3': ['Group B'],
    'Year 4': ['Group A', 'Group C'],
  };

  // Students with numeric IDs for each group
  const students = {
    'Group A': [
      { id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }, { id: 3, name: 'Alice Brown' },
      { id: 4, name: 'Bob White' }, { id: 5, name: 'Emma Green' }, { id: 6, name: 'Lucas Blue' },
      { id: 7, name: 'Mia Red' }, { id: 8, name: 'Noah Yellow' }, { id: 9, name: 'Olivia Purple' },
      { id: 10, name: 'Liam Orange' }, { id: 11, name: 'Sophia Black' }, { id: 12, name: 'Ethan Pink' },
      { id: 13, name: 'Isabella Grey' }, { id: 14, name: 'James Violet' }, { id: 15, name: 'Charlotte Indigo' },
    ],
    'Group B': [
      { id: 16, name: 'Mason Brown' }, { id: 17, name: 'Ella White' }, { id: 18, name: 'Daniel Black' },
      { id: 19, name: 'Amelia Blue' }, { id: 20, name: 'Jackson Green' }, { id: 21, name: 'Ava Red' },
      { id: 22, name: 'Henry Yellow' }, { id: 23, name: 'Madison Purple' }, { id: 24, name: 'Sebastian Orange' },
      { id: 25, name: 'Zoe Pink' }, { id: 26, name: 'Elijah Violet' }, { id: 27, name: 'Hannah Indigo' },
      { id: 28, name: 'Leo Grey' }, { id: 29, name: 'Victoria Violet' }, { id: 30, name: 'Aiden Brown' },
    ],
    'Group C': [
      { id: 31, name: 'Lucas Green' }, { id: 32, name: 'Emily Black' }, { id: 33, name: 'Jack Violet' },
      { id: 34, name: 'Madeline Yellow' }, { id: 35, name: 'Lily Red' }, { id: 36, name: 'Benjamin Purple' },
      { id: 37, name: 'Chloe Orange' }, { id: 38, name: 'Eli Brown' }, { id: 39, name: 'Sophia Pink' },
      { id: 40, name: 'Owen Blue' }, { id: 41, name: 'Charlotte Grey' }, { id: 42, name: 'Mason Red' },
      { id: 43, name: 'Liam Violet' }, { id: 44, name: 'Abigail Green' }, { id: 45, name: 'Oliver Pink' },
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

  const handleCheckboxChange = (studentId) => {
    setAbsentees((prevAbsentees) => {
      let updatedAbsentees;
      if (prevAbsentees.includes(studentId)) {
        updatedAbsentees = prevAbsentees.filter((id) => id !== studentId); // Uncheck
      } else {
        updatedAbsentees = [...prevAbsentees, studentId]; // Check
      }
     
      return updatedAbsentees;
    });
  };

  const handleSubmit = async () => {
    if (!selectedGroup || absentees.length === 0) {
      setError('Please select a group and mark absentees.');
      return;
    }
  
    setLoading(true);
    setError('');
  
    // Get the lesson ID and construct the API URL
    const lessonId = 1; // Replace with the dynamic lesson ID if needed
    const apiUrl = `http://localhost:8000/api/v1/attendance/lessons/${lessonId}/mark_absentees`;
  
    // Log the request URL and body for debugging
    console.log('Sending request to:', apiUrl);
    console.log('Absentees list:', absentees);
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_ids: absentees, // List of student IDs to be marked absent
        }),
      });
  
      if (response.ok) {
        // Handle success
        alert('Absentees marked successfully!');
        setAbsentees([]); // Clear absentees after submitting
      } else {
        // Handle error
        const data = await response.json();
        setError(data.message || 'Failed to mark absentees.');
      }
    } catch (error) {
      setError('An error occurred while marking absentees.');
      console.error('Error during API request:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="dashboard-container">
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
            {students[selectedGroup].map((student) => (
              <div key={student.id} className="student-item">
                <input
                  type="checkbox"
                  checked={absentees.includes(student.id)}
                  onChange={() => handleCheckboxChange(student.id)}
                />
                <span>{student.name}</span>
              </div>
            ))}
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Attendance'}
            </button>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
