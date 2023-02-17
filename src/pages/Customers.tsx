import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../App";
import AddCustomer from "../components/modals/AddCustomer";
import useFetch from "../hooks/UseFetch";
import { baseURL } from "../shared";

export default function Customers() {
    const [show, setShow] = useState(false);
    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    const url = baseURL + "customers";
    const fetchObject: any = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access-token"),
        },
    };

    const {
        request,
        appendData,
        data: customers,
        errorStatus,
    }: any = useFetch(url, fetchObject);

    useEffect(() => {
        request();
    }, []);

    function toggleShow() {
        setShow(!show);
    }

    function newCustomer(name: string, industry: string) {
        appendData({ name, industry });

        if (!errorStatus) {
            toggleShow();
        }
    }

    return (
        <>
            {customers?.length > 0 ? (
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
