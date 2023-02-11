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
import { createContext, useState } from "react";

export const LoginContext = createContext({});

function App() {
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
