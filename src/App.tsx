import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import NotFound from "./components/NotFound";
import Customer from "./pages/Customer";
import Login from "./pages/Login";
import { createContext, useEffect, useState } from "react";
import { baseURL } from "./shared";
import Register from "./pages/Register";

// ! iteratorFix fixes this error
// !Type '{}' must have a '[Symbol.iterator]()' method that returns an iterator.ts(2488)
const iteratorFix: any = {};
export const LoginContext = createContext(iteratorFix);
// export const LoginContext = createContext({});

function App() {
    useEffect(() => {
        if (localStorage.getItem("refresh-token")) {
            function refreshTokens() {
                const url = baseURL + "auth/refresh";
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        Authorization:
                            "Bearer " + localStorage.getItem("refresh-token"),
                    },
                    // !tutorial is done in this way,
                    // !but my backend setup is different
                    // !so i did thing with Authorization header
                    // body: JSON.stringify({
                    //     refresh: localStorage['refresh-token'],
                    // }),
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        console.log(data);
                        localStorage["access-token"] = data["access_token"];
                        localStorage["refresh-token"] = data["refresh_token"];
                        setLoggedIn(true);
                    });
            }

            const minute = 1000 * 60;
            refreshTokens();
            setInterval(refreshTokens, 9 * minute);
        }
    }, []);

    // check local storage for access token
    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem("access-token") ? true : false
    );

    function changeLoggedIn(value: any) {
        setLoggedIn(value);
        if (value === false) localStorage.clear();
    }

    return (
        <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
            <BrowserRouter>
                <Header>
                    <Routes>
                        <Route path="/employees" element={<Employees />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/customers/:id" element={<Customer />} />

                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route path="/dictionary" element={<Dictionary />} />
                        <Route
                            path="/dictionary/:search"
                            element={<Definition />}
                        />

                        <Route path="/404" element={<NotFound />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Header>
            </BrowserRouter>
        </LoginContext.Provider>
    );
}

export default App;
