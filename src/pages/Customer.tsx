import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import { baseURL } from "../shared";

export interface Customer {
	_id: string;
	name: string;
	industry: string;
	createdAt: string;
	updatedAt: string;
	// __v: string;
}

export default function Customer() {
	const [customer, setCustomer] = useState<Customer>();
	const [notFound, setNotFound] = useState(false);

	const { id } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		const url = baseURL + id;
		fetch(url)
			.then((res) => {
				if (res.status === 404) {
					setNotFound(true);
				}

				return res.json();
			})
			.then((data) => {
				setCustomer(data);
			});
	}, []);

	return (
		<>
			{notFound ? (
				<NotFound message={`Customer with ID '${id}' was not found!`} />
			) : customer ? (
				<>
					<h1>Info about customer: </h1>
					{Object.entries(customer).map(([key, value]) => (
						<div key={key}>
							<strong>{key} :</strong> {value}
						</div>
					))}
				</>
			) : null}
			<button
				onClick={(e) => {
					const url = baseURL + id;
					fetch(url, {
						method: "DELETE",
						headers: {
							"Content-type": "application/json",
						},
					})
						.then((res) => {
							if (!res.ok) {
								throw new Error("Something went wrong");
							}
							alert("Succesfully deleted");
							navigate("/customers");
						})
						.catch((e) => console.log(e));
				}}
			>
				Delete
			</button>
			<br />
			<Link to="/customers">Go back</Link>
		</>
	);
}
