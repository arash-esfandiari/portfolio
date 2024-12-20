import React, { useState } from "react";
import "../styles/apps/SprintManager.css"

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
    <section id="sprint-manager">
      <div className="sprint-manager">
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
      </div>
    </section>
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
    <section id="sprint-manager">
      <div className="issue">
        <h3>{issue.title}</h3>
        {issue.assignedTo && <p>Assigned to: {issue.assignedTo}</p>}
        {issue.completedDate && <p>Completed on: {issue.completedDate}</p>}
        {renderAssignButton()}
        {renderMarkAsCompleteButton()}
      </div>
    </section>
  );
};
export default Board;