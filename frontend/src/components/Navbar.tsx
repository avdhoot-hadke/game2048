import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
        <div className="flex bg-gray-200 place-content-between px-6 py-2">
            <div></div>
            <div className="italic font-bold">2048 Game</div>
            <div className="cursor-pointer text-red-500 text-sm" onClick={handleLogout}>
                Logout
            </div>
        </div>
    )
}
