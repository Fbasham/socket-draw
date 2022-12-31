import { useRouter } from "next/router";
import { v4 } from "uuid";
import { useEffect } from "react";

let socket;

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem("clientId")) {
      sessionStorage.setItem("clientId", v4());
    }
  }, []);

  function handleCreateRoom(e) {
    e.preventDefault();

    const room = (Math.random() * 8999 + 1000) | 0;
    sessionStorage.setItem("name", e.target.admin.value);
    sessionStorage.setItem("room", room);
    router.push(`/${room}`);
  }

  function handleJoinRoom(e) {
    e.preventDefault();

    sessionStorage.setItem("name", e.target.name.value);
    sessionStorage.setItem("room", e.target.room.value);
    router.push(`/${e.target.room.value}`);
  }

  return (
    <div className="flex justify-center flex-col items-center max-4-xl">
      <h1 className="text-3xl">Drawbauchery</h1>
      <div className="flex gap-5">
        <form
          onSubmit={handleCreateRoom}
          className="flex flex-col border-2 p-2 gap-2"
        >
          <label htmlFor="admin">Name:</label>
          <input id="admin" className="border"></input>
          <button className="bg-violet-700 text-white mt-auto hover:bg-violet-900">
            Create Room
          </button>
        </form>
        <form
          onSubmit={handleJoinRoom}
          className="flex flex-col border-2 p-2 gap-2"
        >
          <label htmlFor="name">Name:</label>
          <input id="name" className="border"></input>
          <label htmlFor="room">Room:</label>
          <input id="room" className="border"></input>
          <button className="bg-violet-700 text-white hover:bg-violet-900">
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
}
