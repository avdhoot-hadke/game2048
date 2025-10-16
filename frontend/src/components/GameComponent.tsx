import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function GameComponent() {
    const [size, setSize] = useState(4);
    const [board, setBoard] = useState([]);
    const [score, setScore] = useState(0);
    const [status, setStatus] = useState("IN_PROGRESS");

    useEffect(() => {
        initGame(size);
    }, [size]);

    const initGame = async (boardSize: number) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/init`,
                { size: boardSize },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log
            setBoard(res.data.board);
            setScore(res.data.score || 0);
        } catch (err) {
            console.error("Error initializing game:", err);
        }
    };

    // ✅ Handle movement
    const makeMove = useCallback(
        async (direction: String) => {
            if (status === "WON" || status === "LOST") {
                if (status === "WON") toast.success("WON!")
                else toast.error("Game Over!")
                return;
            }

            try {
                const token = localStorage.getItem("token");
                const res = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/api/move`,
                    {
                        board: board,
                        score: score,
                        move: direction,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setBoard(res.data.board);
                setScore(res.data.score);
                setStatus(res.data.status);
            } catch (err) {
                console.error("Error making move:", err);
            }
        },
        [board, score, status]
    );
    useEffect(() => {
        const handleKeyDown = (e: any) => {
            switch (e.key) {
                case "ArrowUp":
                    makeMove("UP");
                    break;
                case "ArrowDown":
                    makeMove("DOWN");
                    break;
                case "ArrowLeft":
                    makeMove("LEFT");
                    break;
                case "ArrowRight":
                    makeMove("RIGHT");
                    break;
                default:
                    break;
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [makeMove]);

    return (
        <>
            <div className=" flex p-6 place-content-between">
                <div className="">
                    <label className="mr-2 font-semibold">Board Size:</label>
                    <select
                        className="border rounded p-2"
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                    >
                        <option value={3}>3 x 3</option>
                        <option value={4}>4 x 4</option>
                        <option value={5}>5 x 5</option>
                        <option value={6}>6 x 6</option>
                        <option value={7}>7 x 7</option>
                        <option value={8}>8 x 8</option>
                    </select>
                </div>

                <div className="text-lg mb-4 text-center">Score: <span className="font-bold">{score}</span></div>
            </div>

            <div className="w-full  flex flex-col items-center">
                <div
                    className="grid gap-3 bg-gray-200 p-3 rounded w-1/4"
                    style={{
                        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
                        gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
                    }}

                >
                    {board.flat().map((cell, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center justify-center rounded text-2xl font-bold aspect-square
              ${cell === 0 ? "bg-gray-100 text-gray-400" : "bg-yellow-400 text-black"}`}
                        >
                            {cell !== 0 ? cell : ""}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex flex-col items-center mt-6 space-y-3">
                    <button
                        onClick={() => makeMove("UP")}
                        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                    >
                        ↑ Up
                    </button>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => makeMove("LEFT")}
                            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                        >
                            ← Left
                        </button>
                        <button
                            onClick={() => makeMove("RIGHT")}
                            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                        >
                            → Right
                        </button>
                    </div>
                    <button
                        onClick={() => makeMove("DOWN")}
                        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                    >
                        ↓ Down
                    </button>
                </div>

                {status !== "IN_PROGRESS" && (
                    <div
                        className={`text-center mt-6 text-2xl font-bold ${status === "WON" ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {status === "WON" ? "🎉 You reached 2048!" : "💀 Game Over!"}
                    </div>
                )}
            </div>
        </>
    )
}
