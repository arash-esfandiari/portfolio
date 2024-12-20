import React, { useState, useEffect } from "react";
import "../styles/apps/PythonIde.css"

import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { EditorView } from "@codemirror/view";
import Sk from "skulpt";
import Split from "react-split";


const PythonIde = () => {
  const [code, setCode] = useState("# Write your Python code here\n" + "\n".repeat(30));
  const [output, setOutput] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    // Listen to window resize events to detect screen size changes
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <section id="ide">
      <div className="ide-container" >
        <h1 className="title">Python Code Editor and Compiler</h1>
        <button className="button" onClick={runCode}>
          Run
        </button>

        {isSmallScreen ? (
          /* Small screen layout: Stacked vertically */
          <div className="stacked">
            <div className="panel">
              <div className="panel-container">
                <CodeMirror
                  value={code}
                  theme="dark"
                  extensions={[python(), EditorView.lineWrapping]}
                  onChange={(value) => handleCodeChange(value)}
                />
              </div>
            </div>
            <div className="panel">
              <div className="panel-container">
                <h2>Output:</h2>
                <pre className="output-pre">{output}</pre>
              </div>
            </div>
          </div>
        ) : (
          /* Large screen layout: Side-by-side with resizing */
          <Split
            className="split"
            direction="horizontal"
            sizes={[50, 50]}
            minSize={200}
            gutterSize={10}
          >
            <div className="panel">
              <div className="panel-container">
                <CodeMirror
                  value={code}
                  theme="dark"
                  extensions={[python(), EditorView.lineWrapping]}
                  onChange={(value) => handleCodeChange(value)}
                />
              </div>
            </div>
            <div className="panel">
              <div className="panel-container">
                <h2>Output:</h2>
                <pre className="output-pre">{output}</pre>
              </div>
            </div>
          </Split>
        )}
      </div>
    </section>
  );
};

export default PythonIde;