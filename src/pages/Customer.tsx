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
	const [tempCustomer, setTempCustomer] = useState<Customer>();

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
				setTempCustomer(data);
			});
	}, []);

	function updateCustomer() {
		const url = baseURL + id;
		fetch(url, {
			method: "PATCH",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(tempCustomer),
		})
			.then((res) => res.json())
			.then((data) => {
				setCustomer(data);
			})
			.catch((e) => console.log(e));
	}

	return (
		<>
			{notFound ? (
				<NotFound message={`Customer with ID '${id}' was not found!`} />
			) : tempCustomer ? (
				<>
					<h1>Info about customer: </h1>
					<div>
						<strong>Id : </strong> {tempCustomer._id}
					</div>
					<div>
						<strong>Name : </strong>

						<input
							className="m-2 px-2"
							type="text"
							value={tempCustomer.name}
							onChange={(e) => {
								setTempCustomer({ ...tempCustomer, name: e.target.value });
							}}
						/>
					</div>
					<div>
						<strong>Industry : </strong>
						<input
							className="m-2 px-2"
							type="text"
							value={tempCustomer.industry}
							onChange={(e) => {
								setTempCustomer({ ...tempCustomer, industry: e.target.value });
							}}
						/>
					</div>
					<button
						className="m-2"
						onClick={() => {
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
						Delete customer
					</button>
				</>
			) : null}
			{customer?.name !== tempCustomer?.name ||
			customer?.industry !== tempCustomer?.industry ? (
				<>
					<button className="m-2" onClick={updateCustomer}>
						Save changes
					</button>

					<button
						className="m-2"
						onClick={() => {
							if (customer) setTempCustomer({ ...customer });
						}}
					>
						Cancel
					</button>
				</>
			) : null}

			<br />
			<Link to="/customers">Go back</Link>
		</>
	);
}
