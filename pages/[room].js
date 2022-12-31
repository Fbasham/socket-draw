import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";

let socket;

export default function Room() {
  const router = useRouter();

  const [data, setData] = useState({});

  useEffect(() => {
    //prevent side-effects of joining room via url only, force player to join room
    if (!sessionStorage.getItem("clientId")) router.push("/");

    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");

    socket = io();
    socket.emit("connect-to-room", {
      room: sessionStorage.getItem("room"),
      clientId: sessionStorage.getItem("clientId"),
      name: sessionStorage.getItem("name"),
    });
    socket.on("update-data", (data) => (console.log(data), setData(data)));
  };

  return (
    <div>
      <h1 className="text-2xl">Room #{router.query?.room}</h1>
      {data?.players?.map((e, i) => (
        <p key={i}>{e.name}</p>
      ))}
    </div>
  );
}
