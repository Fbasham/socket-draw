import { useEffect, useRef, useState } from "react";

function Canvas({ room, socket }) {
  let canvas = useRef();
  let [ctx, setCtx] = useState();
  let pos = { x: 0, y: 0 };

  useEffect(() => {
    setCtx(canvas.current.getContext("2d"));
  }, []);

  // new position from mouse event
  function setPosition(e) {
    pos.x = e.clientX - canvas.current.offsetLeft;
    pos.y = e.clientY - canvas.current.offsetTop;
  }

  function draw(e) {
    // mouse left button must be pressed
    if (e.buttons !== 1) return;

    ctx.beginPath();

    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#c0392b";

    ctx.moveTo(pos.x, pos.y); // from
    setPosition(e);
    ctx.lineTo(pos.x, pos.y); // to

    ctx.stroke();

    socket.emit("canvas-to-server", { room, img: canvas.current.toDataURL() });
  }

  socket?.on("canvas-to-room", (data) => {
    let img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    img.src = data;
  });

  return (
    <canvas
      ref={canvas}
      id="canvas"
      height={300}
      width={500}
      className="border-2 mx-auto"
      onMouseMove={draw}
      onMouseDown={setPosition}
      onMouseEnter={setPosition}
    />
  );
}

export default Canvas;
