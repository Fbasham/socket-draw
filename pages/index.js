import { fabric } from "fabric";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef();
  let [canvas, setCanvas] = useState();
  let [colour, setColour] = useState("black");
  let [brush, setBrush] = useState(2);

  useEffect(() => {
    let canvas = new fabric.Canvas("canvas", {
      height: 400,
      width: 600,
      isDrawingMode: true,
    });
    canvas.freeDrawingBrush.width = brush;
    canvas.freeDrawingBrush.color = colour;
    setCanvas(canvas);

    return () => {
      if (canvas) canvas.dispose();
      canvas = undefined;
    };
  }, []);

  useEffect(() => {
    if (!canvas) return;
    canvas.freeDrawingBrush.width = brush;
  }, [brush]);

  useEffect(() => {
    if (!canvas) return;
    canvas.freeDrawingBrush.color = colour;
  }, [colour]);

  function handleColourChange(e) {
    setColour(e.target.value);
    canvas.freeDrawingBrush.color = e.target.value;
  }

  function handleBrushChange(e) {
    setBrush(e.target.value);
    canvas.freeDrawingBrush.width = e.target.value;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <canvas ref={canvasRef} id="canvas" className="border-2"></canvas>
        <input
          onChange={handleColourChange}
          type="color"
          className="w-8 h-9"
        ></input>
        <input
          type="range"
          min={0}
          max={30}
          onChange={handleBrushChange}
          defaultValue={brush}
        />
      </div>
      <button
        onClick={() => console.log(canvasRef.current.toDataURL())}
        className="bg-blue-700 text-white py-1 px-2 rounded hover:bg-blue-900"
      >
        export
      </button>
    </div>
  );
}
