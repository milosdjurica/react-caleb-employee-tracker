import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../shared";

export default function Customers() {
	const [customers, setCustomers] = useState([]);

	useEffect(() => {
		fetch(baseURL)
			.then((res) => res.json())
			.then((data) => {
				setCustomers(data);
			});
	}, []);

	return (
		<>
			{customers.length > 0 ? (
				<>
					<h1>Here are all customers</h1>
					{customers.map((customer: any) => {
						return (
							<p key={customer._id}>
								<Link to={"/customers/" + customer._id}>{customer.name}</Link>
							</p>
						);
					})}
				</>
			) : null}
		</>
	);
}
