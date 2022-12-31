import { fabric } from "fabric";
import { useState, useEffect, useRef } from "react";

export default function Canvas() {
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
      <h1 className="text-3xl">Drawbauchery</h1>
      <div className="space-y-3 mb-5">
        <canvas ref={canvasRef} id="canvas" className="border-2"></canvas>
        <div className="flex items-center gap-5 mx-auto justify-center">
          <input
            onChange={handleColourChange}
            type="color"
            className="w-8 h-9"
          ></input>
          <div className="flex gap-1">
            <p>0</p>
            <input
              type="range"
              min={0}
              max={10}
              onChange={handleBrushChange}
              defaultValue={brush}
            />
            <p>10</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => console.log(canvasRef.current.toDataURL())}
        className="bg-indigo-700 text-white py-1 px-2 rounded hover:bg-indigo-900"
      >
        export
      </button>
    </div>
  );
}
