import React, { useRef, useState, useEffect } from "react";

const GraphingCalculator = () => {
    const canvasRef = useRef(null);
    const [functionInput, setFunctionInput] = useState("");

    const width = 800;
    const height = 400;

    const xMin = -10;
    const xMax = 10;
    const yMin = -5;
    const yMax = 5;

    const xScale = width / (xMax - xMin);
    const yScale = height / (yMax - yMin);

    const containerStyle = {
        maxWidth: "60vw",
        margin: "50px auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    };

    const inputAreaStyle = {
        display: "flex", // Enables flexbox
        flexDirection: "column", // Stacks label, input, and button vertically
        alignItems: "center", // Centers horizontally
        justifyContent: "center", // Centers vertically
        marginBottom: "20px", // Keeps spacing below the input area
        gap: "10px", // Adds space between elements
    };

    const inputStyle = {
        padding: "10px",
        width: "60%",
        marginRight: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
    };

    const buttonStyle = {
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
    };

    const buttonHoverStyle = {
        backgroundColor: "#0056b3",
    };

    const canvasStyle = {
        width: "100%",
        display: "block",
        margin: "0 auto",
        border: "1px solid #ccc",
        background: "#f9f9f9",
    };

    const drawAxes = (ctx) => {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 1;

        // Draw x-axis
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();

        // Draw y-axis
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.stroke();
    };

    const preprocessInput = (input) => {
        const replacements = {
            sin: "Math.sin",
            cos: "Math.cos",
            tan: "Math.tan",
            log: "Math.log",
            sqrt: "Math.sqrt",
            abs: "Math.abs",
            exp: "Math.exp",
            pi: "Math.PI",
            e: "Math.E",
        };

        for (const [key, value] of Object.entries(replacements)) {
            input = input.replaceAll(key, value);
        }

        return input.replace(/\^/g, "**");
    };

    const parseFunction = (input) => {
        const processedInput = preprocessInput(input);
        return (x) => eval(processedInput);
    };

    const plotFunction = (ctx, func) => {
        ctx.strokeStyle = "#007bff";
        ctx.lineWidth = 2;

        ctx.beginPath();
        let firstPoint = true;

        for (let x = xMin; x <= xMax; x += 0.01) {
            let y;
            try {
                y = func(x);
            } catch {
                alert("Invalid function syntax! Please try again.");
                return;
            }

            const canvasX = (x - xMin) * xScale;
            const canvasY = height - (y - yMin) * yScale;

            if (y >= yMin && y <= yMax) {
                if (firstPoint) {
                    ctx.moveTo(canvasX, canvasY);
                    firstPoint = false;
                } else {
                    ctx.lineTo(canvasX, canvasY);
                }
            }
        }
        ctx.stroke();
    };

    const handlePlot = () => {
        if (!functionInput.trim()) {
            alert("Please enter a function.");
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        try {
            const func = parseFunction(functionInput);
            drawAxes(ctx);
            plotFunction(ctx, func);
        } catch (error) {
            alert("Error in function: " + error.message);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        drawAxes(ctx);
    }, []);

    return (
        <div style={containerStyle}>
            <h1 style={{ color: "#333" }}>Graphing Calculator</h1>
            <div style={inputAreaStyle}>
                <label htmlFor="function">
                    Function (e.g., x^2, sin(x), log(x)):
                </label>
                <input
                    type="text"
                    id="function"
                    value={functionInput}
                    onChange={(e) => setFunctionInput(e.target.value)}
                    placeholder="Enter a function of x"
                    style={inputStyle}
                />
                <button
                    onClick={handlePlot}
                    style={{
                        ...buttonStyle,
                        ...(functionInput ? {} : buttonHoverStyle),
                    }}
                >
                    Plot Graph
                </button>
            </div>
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                style={canvasStyle}
            ></canvas>
        </div>
    );
};

export default GraphingCalculator;