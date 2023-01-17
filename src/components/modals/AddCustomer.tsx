import { useState } from "react";
import Modal from "react-bootstrap/Modal";

export default function AddCustomer(props: any) {
	const [name, setName] = useState("");
	const [industry, setIndustry] = useState("");

	return (
		<>
			<button
				className="block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
				onClick={props.toggleShow}
			>
				+ Add Customer
			</button>

			<Modal
				show={props.show}
				onHide={props.toggleShow}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Add customer</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form
						onSubmit={(e) => {
							// preventing page refresh
							e.preventDefault();
							setName("");
							setIndustry("");
							// ne moram da pravim stateVariable za ID
							// zato sto ga ne menjam
							props.createCustomer(name, industry);
						}}
						id="editmodal"
						className="w-full max-w-sm"
					>
						<div className="md:flex md:items-center mb-6">
							<div className="md:w-1/3">
								<label
									className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
									htmlFor="name"
								>
									Name
								</label>
							</div>
							<div className="md:w-2/3">
								<input
									className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
									id="name"
									type="text"
									value={name}
									onChange={(e) => {
										setName(e.target.value);
									}}
								/>
							</div>
						</div>
						<div className="md:flex md:items-center mb-6">
							<div className="md:w-1/3">
								<label
									className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
									htmlFor="industry"
								>
									Industry
								</label>
							</div>
							<div className="md:w-2/3">
								<input
									className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
									id="industry"
									type="text"
									value={industry}
									onChange={(e) => {
										setIndustry(e.target.value);
									}}
								/>
							</div>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<button
						onClick={props.toggleShow}
						className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
					>
						Close
					</button>
					<button
						form="editmodal"
						className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
					>
						Add
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
