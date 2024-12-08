import React, { useReducer, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './LessonDetails.css';
import { useLocation } from 'react-router-dom';

const initialState = {
  students: [],
  lesson: {},
  isLoading: false,
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, students: action.payload, error: '' };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error('Unsupported action type');
  }
};

const LessonDetails = () => {
  const { lessonId } = useParams();
  const location = useLocation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Destructure the state received from the previous page
  const { subjectTitle, groupNumber, lessonDateTime } = location.state || {};

  useEffect(() => {
    const fetchLessonAndStudents = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          alert('Access token is missing. Redirecting to login.');
          window.location.href = '/';
          return;
        }

        const url = `http://localhost:8000/api/dashboard/lessons/${lessonId}/students`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Failed to fetch students');
        }

        const data = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE', payload: error.message });
      }
    };

    fetchLessonAndStudents();
  }, [lessonId]);

  const { students, isLoading, error } = state;

  const handleStudentSelect = (studentId) => {
    setSelectedStudentIds((prevIds) =>
      prevIds.includes(studentId)
        ? prevIds.filter((id) => id !== studentId) // Remove if already selected
        : [...prevIds, studentId] // Add if not selected
    );
  };

  const handleSubmit = async () => {
    if (selectedStudentIds.length === 0) {
      alert('Please select at least one student.');
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Access token is missing. Redirecting to login.');
      window.location.href = '/';
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/dashboard/lessons/${lessonId}/mark_absentees`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          student_ids: selectedStudentIds,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to mark absentees');
      }

      alert('Absentees marked successfully!');
      navigate('/professor-dashboard'); // Redirect to the dashboard
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="lesson-details">
      <Navbar />
      <div className="lesson-header">
        <h1>{subjectTitle} (Group {groupNumber}) <br /> {new Date(lessonDateTime).toLocaleString()}</h1>
      </div>

      {isLoading && <div className="loading">Loading students...</div>}
      {error && <div className="error">{error}</div>}

      <div id="students-container">
        {!isLoading && students.length === 0 ? (
          <p>No students found for this lesson.</p>
        ) : (
          students && students.length > 0 && (
            <div className="students-list">
              {students.map((student) => (
                <div
                  className="student-item"
                  key={student.id}
                >
                  <input
                    type="checkbox"
                    checked={selectedStudentIds.includes(student.id)}
                    onChange={() => handleStudentSelect(student.id)}
                  />
                  <p>{student.first_name} {student.last_name} </p>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {selectedStudentIds.length > 0 && (
        <div className="selected-students">
          <h3>Selected Students:</h3>
          <ul>
            {students
              .filter((student) => selectedStudentIds.includes(student.id))
              .map((student) => (
                <li key={student.id}>
                  {student.first_name} {student.last_name}
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Submit Button */}
      <div className="submit-container">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Selected Students
        </button>
      </div>
    </div>
  );
};

export default LessonDetails;
