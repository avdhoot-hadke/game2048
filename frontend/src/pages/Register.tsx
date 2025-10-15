import axios from "axios";
import { toast } from "react-toastify";
import AuthForm from "../components/AuthForm";

export default function Register() {
      const handleRegister = async (username: string, password: string) => {
        try {
            await axios.post<{ token: string }>(`${import.meta.env.VITE_API_BASE_URL}/api/auth/public/register`, {
                username,
                password,
            });
            toast.success("Registration successful!");
            // navigate("/");
            window.location.href = "/login";

        } catch (error) {
            toast.error("Registration Failed!");
            console.log("Registration",error);
        }

    }


    return (
        <AuthForm onSubmit={handleRegister} submitBtn="Register" />
    )
}
