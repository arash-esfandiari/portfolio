import React, { useRef, useState, useEffect } from "react";
import "../styles/apps/GraphingCalc.css"

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


    const drawAxes = (ctx) => {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = "#e0e0e0"; // Light axis color
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
        ctx.strokeStyle = "#6a0dad"; // Purple graph line
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
            const func = parseFunction(functionInput.toLowerCase());
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
        <section className="graphing-calc" id="g-calc">
            <div className="container">
                <h1 style={{ color: "#e0e0e0" }}>Graphing Calculator</h1>
                <div className="input-area ">
                    <label htmlFor="function">
                        Function (e.g., x^2, sin(x), log(x)):
                    </label>
                    <input
                        className="input"
                        type="text"
                        id="function"
                        value={functionInput}
                        onChange={(e) => setFunctionInput(e.target.value)}
                        placeholder="Enter a function of x"
                    />
                    <button
                        className="button"
                        onClick={handlePlot}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#4b0082")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#6a0dad")}
                    >
                        Plot Graph
                    </button>
                </div>
                <canvas
                    className="canvas"
                    ref={canvasRef}
                    width={width}
                    height={height}
                ></canvas>
            </div>
        </section >
    );
};

export default GraphingCalculator;