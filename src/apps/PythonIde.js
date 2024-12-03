import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { EditorView } from "@codemirror/view";
import Split from "react-split";
import Sk from "skulpt";

const styles = {
  body: {
    backgroundColor: "#f4f4f9",
    margin: 0,
    fontFamily: "Arial, sans-serif",
    height: "100vh",
    overflow: "hidden",
  },
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#6a0dad",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#6a0dad",
    color: "#fff",
    marginBottom: "20px",
    transition: "background-color 0.3s ease", // Smooth hover transition
  },
  split: {
    display: "flex",
    height: "80vh",
    marginTop: "20px",
  },
  panel: {
    width: "50%",
    padding: "10px",
  },
  panelContainer: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    height: "100%",
    overflow: "auto",
  },
  gutter: {
    backgroundColor: "#eee",
    cursor: "col-resize",
  },
  outputPre: {
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  },
};

const PythonIde = () => {
  const [code, setCode] = useState("# Write your Python code here\n" + "\n".repeat(30));
  const [output, setOutput] = useState("");

  const handleCodeChange = (value) => setCode(value);

  const runCode = () => {
    setOutput("");
    const outputHandler = (text) => setOutput((prev) => prev + text);
    const errorHandler = (err) => setOutput((prev) => prev + err.toString());

    Sk.configure({
      output: outputHandler,
      read: (file) => {
        if (!Sk.builtinFiles?.files[file]) throw `File not found: '${file}'`;
        return Sk.builtinFiles.files[file];
      },
    });

    Sk.misceval
      .asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, code, true))
      .then(() => setOutput((prev) => prev + "\nExecution finished successfully."))
      .catch(errorHandler);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Simple Python Code Editor</h1>
      <button
        style={styles.button}
        onClick={runCode}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#4b0082")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#6a0dad")}>
        Run
      </button>
      <Split
        style={styles.split}
        gutterStyle={() => styles.gutter}
      >
        <div style={styles.panel}>
          <div style={styles.panelContainer}>
            <CodeMirror
              value={code}
              theme="dark"
              extensions={[python(), EditorView.lineWrapping]}
              onChange={(value) => handleCodeChange(value)}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
        <div style={styles.panel}>
          <div style={styles.panelContainer}>
            <h2>Output:</h2>
            <pre style={styles.outputPre}>{output}</pre>
          </div>
        </div>
      </Split>
    </div>
  );
};

export default PythonIde;