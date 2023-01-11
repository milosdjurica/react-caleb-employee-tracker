import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddCustomer from "../components/modals/AddCustomer";
import { baseURL } from "../shared";
import { Customer } from "./Customer";

export default function Customers() {
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [show, setShow] = useState(false);

	useEffect(() => {
		fetch(baseURL)
			.then((res) => res.json())
			.then((data) => {
				setCustomers(data);
			});
	}, []);

	function toggleShow() {
		setShow(!show);
	}

	function newCustomer(name: string, industry: string) {
		const data = { name, industry };
		const url = baseURL;
		fetch(url, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => {
				if (!res.ok) throw new Error("Something went wrong");
				return res.json();
			})
			.then((data) => {
				toggleShow();
				console.log(data);
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
					<ul>
						{customers.map((customer: any) => {
							return (
								<li key={customer._id}>
									<Link to={"/customers/" + customer._id}>{customer.name}</Link>
								</li>
							);
						})}
					</ul>
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
