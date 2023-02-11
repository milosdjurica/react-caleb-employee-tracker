import { useState } from "react";
import { baseURL } from "../shared";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    function login(e: any) {
        e.preventDefault();
        const url = baseURL + "auth/login";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                localStorage.setItem("access-token", data.access_token);
                localStorage.setItem("refresh-token", data.refresh_token);
                console.log(location);
                navigate(
                    location?.state?.previousUrl
                        ? location.state.previousUrl
                        : "/customers"
                );
            });
    }

    return (
        <form id="login" onSubmit={login} className="m-2 w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                    <label className="font-bold" htmlFor="email">
                        Email :
                    </label>
                </div>
                <div className="md:w-3/4">
                    <input
                        id="email"
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        type="text"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                    <label className="font-bold" htmlFor="password">
                        Password :
                    </label>
                </div>
                <div className="md:w-3/4">
                    <input
                        id="password"
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
            </div>

            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                Log in
            </button>
        </form>
    );
}
