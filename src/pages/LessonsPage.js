import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './LessonsPage.css';

const LessonsPage = () => {
  const { subjectId } = useParams(); 
  const location = useLocation(); 
  const navigate = useNavigate(); 

  const groupNumber = new URLSearchParams(location.search).get('group_number');

  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState('');

  const handleViewStudents = (lessonId, subjectTitle, lessonDateTime) => {
    navigate(`/lesson/${lessonId}/students`, {
      state: { subjectTitle, groupNumber, lessonDateTime }
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'canceled':
        return { backgroundColor: 'red', text: 'Canceled' };
      case 'completed':
        return { backgroundColor: 'green', text: 'Completed' };
      case 'upcoming':
        return { backgroundColor: 'blue', text: 'Upcoming' };
      default:
        return { backgroundColor: 'gray', text: 'Unknown' };
    }
  };

  const isClickable = (status, lessonDateTime) => {
    const now = new Date();
    const lessonStartTime = new Date(lessonDateTime);
    const timeDifference = (now - lessonStartTime) / (1000 * 60); // Difference in minutes

    return status === 'upcoming' && timeDifference >= 0 && timeDifference <= 30;
  };

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        if (!subjectId || !groupNumber) {
          setError('Missing subject or group information.');
          return;
        }

        const token = localStorage.getItem('access_token');
        if (!token) {
          alert('Access token is missing. Redirecting to login.');
          window.location.href = '/';
          return;
        }

        const url = `http://localhost:8000/api/dashboard/lessons?subject_per_group_id=${subjectId}&group_number=${groupNumber}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Failed to fetch lessons');
        }

        const data = await response.json();

        const sortedLessons = data.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));

        setLessons(sortedLessons);
        setError('');
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLessons();
  }, [subjectId, groupNumber]);

  return (
    <div className="lessons-page">
      <Navbar />
      <div className="page-header">
        <h1>Group {groupNumber}</h1>
      </div>
      {error && <p className="lessons-page-error">{error}</p>}
      <div className="lessons-list">
        {lessons.length === 0 ? (
          <p>No lessons found.</p>
        ) : (
          lessons.map((lesson) => {
            const { backgroundColor, text } = getStatusStyle(lesson.status);
            const clickable = isClickable(lesson.status, lesson.date_time);
            return (
              <div
                className={`lesson-card ${clickable ? 'clickable' : ''}`}
                key={lesson.id}
                onClick={() =>
                  clickable && handleViewStudents(lesson.id, lesson.subject_name, lesson.date_time)
                } 
              >
                {/* Status Box */}
                <div
                  className="status-box"
                  style={{
                    backgroundColor: backgroundColor,
                  }}
                >
                  <span>{text}</span>
                </div>

                <h3 className="lesson-title">{lesson.subject_name}</h3>
                <p>
                  <strong>Lesson ID:</strong> {lesson.id}
                </p>
                <p>
                  <strong>Professor:</strong> {lesson.professor_full_name}
                </p>
                <p>
                  <strong>Status:</strong> {lesson.status}
                </p>
                <p>
                  <strong>Date and Time:</strong> {new Date(lesson.date_time).toLocaleString()}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LessonsPage;
