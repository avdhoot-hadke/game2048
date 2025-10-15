
import AuthForm from "../components/AuthForm";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {

    const handleLogin = async (username: string, password: string) => {
        try {
            const response = await axios.post<{ token: string }>(`${import.meta.env.VITE_API_BASE_URL}/api/auth/public/login`, {
                username,
                password,
            });
            localStorage.setItem("token", response.data.token);
            toast.success("Login successful!");
            // navigate("/");
            window.location.href = "/";

        } catch (error) {
            toast.error("Login Failed!");
            console.log("Login",error);
        }

    }


    return (
        <AuthForm onSubmit={handleLogin} submitBtn="Login" />
    )
}
