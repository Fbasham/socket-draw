import { fabric } from "fabric";
import { useState, useEffect } from "react";

export default function Home() {
  let [canvas, setCanvas] = useState();

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
      <canvas id="canvas"></canvas>
    </>
  );
}
