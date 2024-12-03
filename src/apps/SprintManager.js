import React, { useState } from "react";

// Board component represents the sprint board
const Board = () => {
  const [issues, setIssues] = useState([
    { id: 1, title: "Add random fun apps to portfolio", status: "to_do" },
    { id: 2, title: "Create serverless function to send emails", status: "to_do" },
    { id: 3, title: "Update button colours", status: "to_do" },
    { id: 4, title: "Go to the gym, enough coding for today!", status: "to_do" },
  ]);

  const addTask = () => {
    const title = prompt("Enter the task title:");
    if (title) {
      const newTask = {
        id: issues.length + 1,
        title,
        status: "to_do",
      };
      setIssues([...issues, newTask]);
    }
  };

  const assignIssue = (issue) => {
    const assignedTo = prompt("Enter your name:");
    if (assignedTo) {
      const updatedIssues = issues.map((i) =>
        i.id === issue.id
          ? { ...i, assignedTo, status: "in_progress" }
          : i
      );
      setIssues(updatedIssues);
    }
  };

  const markAsComplete = (issue) => {
    const completedDate = new Date().toLocaleDateString();
    const updatedIssues = issues.map((i) =>
      i.id === issue.id
        ? { ...i, status: "done", completedDate }
        : i
    );
    setIssues(updatedIssues);
  };

  const renderIssues = (status) =>
    issues
      .filter((issue) => issue.status === status)
      .map((issue) => (
        <Issue
          key={issue.id}
          issue={issue}
          assignIssue={assignIssue}
          markAsComplete={markAsComplete}
        />
      ));

  return (
    <div className="app">
      <h1>Simple Sprint Manager</h1>
      <button className="add-task-btn" onClick={addTask}>Add Task</button>
      <div className="board">
        <div className="section">
          <h2>To Do</h2>
          {renderIssues("to_do")}
        </div>
        <div className="section">
          <h2>In Progress</h2>
          {renderIssues("in_progress")}
        </div>
        <div className="section">
          <h2>Done</h2>
          {renderIssues("done")}
        </div>
      </div>
      <style>{styles}</style>
    </div>
  );
};

const Issue = ({ issue, assignIssue, markAsComplete }) => {
  const renderAssignButton = () =>
    !issue.assignedTo && (
      <button onClick={() => assignIssue(issue)}>Assign</button>
    );

  const renderMarkAsCompleteButton = () =>
    issue.status === "in_progress" && (
      <button onClick={() => markAsComplete(issue)}>Mark as Complete</button>
    );

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

const styles = `
  .app {
    max-width: 95vw;
    margin: 20px auto;
    padding: 10px;
    font-size: 12px;
    color: #e0e0e0;
    background-color: #121212;
    border: 1px solid #333;
    border-radius: 5px;
  }

  .add-task-btn {
    margin: 10px 0;
    background-color: #6a0dad; /* Purple color */
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: "background-color 0.3s ease"; // Smooth hover transition
  }

  .add-task-btn:hover {
    background-color: #4b0082; /* Darker purple on hover */
  }

  .board {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .section {
    padding: 10px;
    border: 1px solid #333;
    border-radius: 5px;
    background-color: #1e1e1e;
  }

  .section h2 {
    margin-top: 0;
    font-size: 14px;
    color: #fff;
  }

  .issue {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #333;
    border-radius: 5px;
    background-color: #2c2c2c;
    font-size: 12px;
  }

  .issue h3 {
    margin-top: 0;
    font-size: 12px;
    color: #fff;
  }

  .issue p {
    font-size: 10px;
    margin: 5px 0;
    color: #a0a0a0;
  }

  button {
    background-color: #6a0dad; /* Purple color */
    color: #fff;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
  }

  button:hover {
    background-color: #4b0082; /* Darker purple on hover */
  }

  @media (min-width: 768px) {
    .board {
      flex-direction: row;
      justify-content: space-between;
    }

    .section {
      flex-basis: 30%;
    }
  }
`;

export default Board;