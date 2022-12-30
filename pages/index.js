import { fabric } from "fabric";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  let [canvas, setCanvas] = useState();
  const canvasRef = useRef();

  useEffect(() => {
    let C = new fabric.Canvas("canvas", {
      height: 400,
      width: 600,
      isDrawingMode: true,
    });
    C.freeDrawingBrush.width = 5;
    C.freeDrawingBrush.color = "red";
    setCanvas(C);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="canvas"></canvas>
      <button onClick={() => console.log(canvasRef.current.toDataURL())}>
        export
      </button>
    </>
  );
}
