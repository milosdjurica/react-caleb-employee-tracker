import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import { baseURL } from "../shared";

interface Customer {
	_id: string;
	name: string;
	industry: string;
	createdAt: string;
	updatedAt: string;
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
				<div>
					<h1>Info about customer: </h1>
					{Object.entries(customer).map(([key, value]) => (
						<div key={key}>
							<strong>{key} :</strong> {value}
						</div>
					))}
				</div>
			) : null}
			<Link to="/customers">Go back</Link>
		</>
	);
}
