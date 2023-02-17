import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LoginContext } from "../App";
import AddCustomer from "../components/modals/AddCustomer";
import { baseURL } from "../shared";
import { Customer } from "./Customer";

export default function Customers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    useEffect(() => {
        const url = baseURL + "customers";
        fetch(url, {
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access-token"),
            },
        })
            .then((res) => {
                if (res.status === 401) {
                    setLoggedIn(false);
                    navigate("/login", {
                        state: {
                            // location.pathname je url na kojem smo trenutno ('/customers')
                            // prosledjujemo ga login-u
                            // on ce redirect nazad na ovaj url nakon sto se unesu email i sifra
                            previousUrl: location.pathname,
                        },
                    });
                }

                return res.json();
            })
            .then((data) => {
                setCustomers(data);
            });
    }, []);

    function toggleShow() {
        setShow(!show);
    }

    function newCustomer(name: string, industry: string) {
        const data = { name, industry };
        const url = baseURL + "customers";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access-token"),
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Something went wrong");
                // syntax error -> check notes?
                return res.json();
            })
            .then((data) => {
                toggleShow();
                // console.log(data);
                // const cust: any = [...customers];
                setCustomers([...customers, data]);
            })
            .catch((e) => console.log(e));
    }

    return (
        <>
            {customers.length > 0 ? (
                <>
                    <h1>Here are all customers</h1>
                    {customers.map((customer: any) => {
                        return (
                            <div className="m-2" key={customer._id}>
                                <Link to={"/customers/" + customer._id}>
                                    <button className="no-underline bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                                        {customer.name}
                                    </button>
                                </Link>
                            </div>
                        );
                    })}
                </>
            ) : null}
            <AddCustomer
                createCustomer={newCustomer}
                show={show}
                toggleShow={toggleShow}
            />
        </>
    );
}
