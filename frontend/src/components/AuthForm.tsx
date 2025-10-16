import { useState } from "react";
import { Link } from "react-router-dom";

export default function AuthForm({ onSubmit, submitBtn }: {
    onSubmit: (username: string, password: string) => void, submitBtn: string;
}) {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        onSubmit(formData.username, formData.password);
    }

    return (
        <div className="bg-gray-200 h-[100vh] w-full flex flex-col items-center justify-center">

            <form onSubmit={handleSubmit} className="p-10 flex flex-col w-[30%] justify-center bg-gray-50 rounded-lg">
                <h1 className="text-center pb-5 text-2xl">{submitBtn} Form</h1>
                <div className="flex flex-col">
                    <p>Username</p>
                    <input className="bg-white border-1 rounded p-1 text-sm" placeholder="ex: johndoe" type="text" value={formData.username} onChange={(e) => {
                        setFormData(prev => {
                            return {
                                ...prev,
                                username: e.target.value
                            }
                        })
                    }} />
                </div>
                <div className="flex flex-col mt-3">
                    <p>Password</p>
                    <input className="bg-white border-1 rounded p-1 text-sm" placeholder="Type Password" type="password" value={formData.password} onChange={(e) => {
                        setFormData(prev => {
                            return {
                                ...prev,
                                password: e.target.value,
                            }
                        })
                    }} />
                </div>
                <div className="flex flex-col justify-center items-center w-full">
                    <button className="border-1 cursor-pointer rounded mt-7 w-30 hover:bg-gray-200" type="submit">{submitBtn}</button>
                </div>
                {
                    (submitBtn == "Login") ?
                        <p className="text-center mt-4 text-xs">
                            Haven't Registered? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
                        </p>
                        :
                        <p className="text-center mt-4 text-xs">
                            Already Register <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
                        </p>
                }

            </form>
        </div>
    )
}
