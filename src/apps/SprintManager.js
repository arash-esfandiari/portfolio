import React, { useState } from 'react';

// Board component represents the sprint board
const Board = () => {
    // Initialize issues with hardcoded data
    const [issues, setIssues] = useState([
        { id: 1, title: 'Add random fun apps to portfolio', status: 'to_do' },
        { id: 2, title: 'Create serverless function to send emails', status: 'to_do' },
        { id: 3, title: 'Update button colours', status: 'to_do' },
        { id: 4, title: 'Go to the gym, enoguh coding for today!', status: 'to_do' },
    ]);

    // Function to assign an issue to a user
    const assignIssue = (issue) => {
        const assignedTo = prompt('Enter your name:');
        if (assignedTo) {
            const updatedIssues = issues.map((i) => {
                if (i.id === issue.id) {
                    return { ...i, assignedTo, status: 'in_progress' };
                }
                return i;
            });
            setIssues(updatedIssues);
        }
    };

    // Function to mark an issue as complete
    const markAsComplete = (issue) => {
        const completedDate = new Date().toLocaleDateString();
        const updatedIssues = issues.map((i) => {
            if (i.id === issue.id) {
                return { ...i, status: 'done', completedDate };
            }
            return i;
        });
        setIssues(updatedIssues);
    };

    // Render issues in each section
    const renderIssues = (status) => {
        return issues
            .filter((issue) => issue.status === status)
            .map((issue) => (
                <Issue
                    key={issue.id}
                    issue={issue}
                    assignIssue={assignIssue}
                    markAsComplete={markAsComplete}
                />
            ));
    };

    return (
        <div className="app">
            <h1>Simple Sprint Manager</h1>
            <div className="board">
                <div className="section">
                    <h2>To Do</h2>
                    {renderIssues('to_do')}
                </div>
                <div className="section">
                    <h2>In Progress</h2>
                    {renderIssues('in_progress')}
                </div>
                <div className="section">
                    <h2>Done</h2>
                    {renderIssues('done')}
                </div>
            </div>
            <style>{styles}</style>
        </div>
    );
};

// Issue component represents a single issue
const Issue = ({ issue, assignIssue, markAsComplete }) => {
    // Render assign button if issue is not assigned
    const renderAssignButton = () => {
        if (!issue.assignedTo) {
            return (
                <button onClick={() => assignIssue(issue)}>Assign</button>
            );
        }
        return null;
    };

    // Render mark as complete button if issue is in progress
    const renderMarkAsCompleteButton = () => {
        if (issue.status === 'in_progress') {
            return (
                <button onClick={() => markAsComplete(issue)}>Mark as Complete</button>
            );
        }
        return null;
    };

    return (
        <div className="issue">
            <h3>{issue.title}</h3>
            {issue.assignedTo && <p>Assigned to: {issue.assignedTo}</p>}
            {issue.completedDate && <p>Completed on: {issue.completedDate}</p>}
            {renderAssignButton()}
            {renderMarkAsCompleteButton()}
        </div>
    );
};

// CSS Styles
const styles = `
/* Styles for the main app container */
.app {
  max-width: 90vw;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #000000;
  background-color: white;
}

/* Flexbox container for the board sections */
.board {
  display: flex;
  justify-content: space-between;
}

/* Shared styles for each section (To Do, In Progress, Done) */
.section {
  flex-basis: 30%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
}

/* Style for section headings (e.g., "To Do", "In Progress") */
.section h2 {
  margin-top: 0;
}

/* Styles for individual issues in the board */
.issue {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
}

/* Style for issue headings (e.g., issue titles) */
.issue h3 {
  margin-top: 0;
}

/* Default button styles */
button {
  background-color: #4CAF50;
  color: #000000;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Hover effect for buttons */
button:hover {
  background-color: #3e8e41;
}
`;

export default Board;