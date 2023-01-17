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

	function updateCustomer(e: any) {
		e.preventDefault();
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
		<div className="p-3">
			{notFound ? (
				<NotFound message={`Customer with ID '${id}' was not found!`} />
			) : tempCustomer ? (
				<div>
					<h1>Info about customer: </h1>
					<form
						id="customer"
						onSubmit={updateCustomer}
						className="w-full max-w-sm"
					>
						<div className="md:flex md:items-center mb-6">
							<div className="md:w-1/4">
								<label className="font-bold">Id : </label>
							</div>
							<div className="md:w-3/4">{tempCustomer._id}</div>
						</div>
						<div className="md:flex md:items-center mb-6">
							<div className="md:w-1/4">
								<label className="font-bold" htmlFor="name">
									Name :{" "}
								</label>
							</div>
							<div className="md:w-3/4">
								<input
									id="name"
									className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
									type="text"
									value={tempCustomer.name}
									onChange={(e) => {
										setTempCustomer({ ...tempCustomer, name: e.target.value });
									}}
								/>
							</div>
						</div>
						<div className="md:flex md:items-center mb-6">
							<div className="md:w-1/4">
								<label className="font-bold" htmlFor="industry">
									Industry :{" "}
								</label>
							</div>
							<div className="md:w-3/4">
								<input
									id="industry"
									className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
									type="text"
									value={tempCustomer.industry}
									onChange={(e) => {
										setTempCustomer({
											...tempCustomer,
											industry: e.target.value,
										});
									}}
								/>
							</div>
						</div>
					</form>

					{customer?.name !== tempCustomer?.name ||
					customer?.industry !== tempCustomer?.industry ? (
						<div className="mb-2">
							<button
								form="customer"
								className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 mr-2 rounded"
							>
								Save
							</button>

							<button
								className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
								onClick={() => {
									if (customer) setTempCustomer({ ...customer });
								}}
							>
								Cancel
							</button>
						</div>
					) : null}

					<div>
						<button
							className="bg-slate-800 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
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
							Delete
						</button>
					</div>
				</div>
			) : null}

			<br />
			<Link to="/customers">
				<button className="no-underline bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
					← Go back
				</button>
			</Link>
		</div>
	);
}
